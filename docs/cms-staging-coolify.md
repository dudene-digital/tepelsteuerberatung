# CMS-Staging auf coolify-1 einrichten

Ziel: eine eigene, passwortgeschützte Testumgebung mit Payload CMS, getrennt von der Live-Seite. Die Live-App bleibt unverändert. Bezeichnungen in Coolify können je nach Version leicht abweichen.

## 1. Datenbank anlegen

1. Im Projekt der Tepel-Seite: **New Resource → Database → PostgreSQL**, Server **coolify-1**, Version 17.
2. Name zum Beispiel `tepel-cms-staging-db`. Benutzer und Passwort erzeugt Coolify.
3. Starten und die **interne Verbindungs-URL** kopieren (beginnt mit `postgres://`, Host ist der Container-Name). Die Datenbank braucht keinen öffentlichen Port.
4. Unter **Backups** eine tägliche Sicherung einrichten, wenn möglich auf ein S3-Ziel.

## 2. App anlegen

1. **New Resource → Application** aus dem GitHub-Repository `dudene-digital/tepelsteuerberatung`, Branch **`cms`**.
2. Build Pack: **Dockerfile**. Port: **3000**.
3. Domain: die von Coolify vorgeschlagene Adresse genügt. Eine Subdomain wie `staging.tepel-steuerberatung.de` bräuchte einen DNS-Eintrag bei Fabians Domain-Anbieter.

## 3. Umgebungsvariablen

| Variable | Wert |
| --- | --- |
| `DATABASE_URI` | interne URL aus Schritt 1 |
| `PAYLOAD_SECRET` | neu erzeugen: `openssl rand -hex 32` |
| `STAGING_BASIC_AUTH` | `staging:<passwort>`, Passwort selbst wählen |
| `RESEND_API_KEY` | leer lassen, damit auf Staging keine Mails rausgehen |

`PAYLOAD_MEDIA_DIR` und die Speichergrenze für den Build (`NODE_OPTIONS`) setzt bereits das Dockerfile.

## 4. Speicher für Uploads

**Persistent Storage → Volume** (kein Ordner auf dem Host), Zielpfad im Container: **`/app/media`**. Ein neues Docker-Volume übernimmt die Rechte aus dem Image; ein eingehängter Host-Ordner gehört dagegen root, und Uploads scheitern dann.

## 5. Server

Unter den Einstellungen von **coolify-1** die Zahl gleichzeitiger Builds auf **1** setzen. Dann kommen sich die Builds der Apps auf dem Server nicht in die Quere.

## 6. Deploy und erster Test

1. Deploy starten. Der Build braucht keine Datenbank. Beim ersten Start legt die Migration die Tabellen an, danach entstehen die vier Kategorien.
2. Seite aufrufen, Passwortabfrage mit `staging` und dem Passwort aus Schritt 3.
3. `/admin` öffnen und den ersten Benutzer anlegen. Wer sich als Erster anmeldet, wird Admin.
4. Ein Bild hochladen, einen Artikel anlegen, veröffentlichen und unter `/wissen` prüfen.
5. Im Build-Log den Speicherbedarf beobachten. Lokal lag die Spitze bei etwa 1,6 GB.

## Später auf der Live-Seite

Dieselben Schritte für die Live-App, aber ohne `STAGING_BASIC_AUTH` und mit dem echten `RESEND_API_KEY`. Für „Passwort vergessen“ in der Redaktion braucht Payload noch einen Mailversand; das ist im Prototyp nicht eingerichtet.

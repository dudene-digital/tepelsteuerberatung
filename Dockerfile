# Next.js-Seite für Coolify (Build Pack: Dockerfile)
# Node-Version an allen drei FROM-Zeilen gleich halten.
# Dependabot (Ökosystem "docker") kann sie automatisch hochziehen.

# --- Abhängigkeiten installieren ---
FROM node:22.23.4-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN corepack enable \
 && if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
    elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    else npm install; fi

# --- Bauen ---
FROM node:22.23.4-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# Braucht die Seite NEXT_PUBLIC_-Variablen beim Build, hier ergänzen, z. B.:
# ARG NEXT_PUBLIC_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Laufzeit ---
FROM node:22.23.4-alpine AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app ./
USER node
EXPOSE 3000
CMD ["npm", "start"]

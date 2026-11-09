import type { Access, FieldAccess } from "payload";

/* Zwei Rollen: Admin (Dudene Digital) und Redaktion (Fabian und sein Team). */
type Rolle = "admin" | "redaktion";

const rolleVon = (user: unknown): Rolle | undefined =>
  (user as { rolle?: Rolle } | null | undefined)?.rolle;

export const angemeldet: Access = ({ req: { user } }) => Boolean(user);

export const nurAdmin: Access = ({ req: { user } }) => rolleVon(user) === "admin";

export const nurAdminFeld: FieldAccess = ({ req: { user } }) => rolleVon(user) === "admin";

/** Admins sehen und ändern alle Benutzer, alle anderen nur sich selbst. */
export const adminOderSelbst: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (rolleVon(user) === "admin") return true;
  return { id: { equals: user.id } };
};

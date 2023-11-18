import { accounts, sessions, users, verificationTokens } from "@/db/schemas";
import { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import { eq, and } from "drizzle-orm";
import { Adapter, AdapterAccount } from "next-auth/adapters";
import { db } from "@/db/drizzle";

export function SQLiteDrizzleAdapter(client: typeof db): Adapter {
  return {
    createUser(data) {
      return client
        .insert(users)
        .values({ ...data, id: crypto.randomUUID() })
        .returning()
        .get();
    },
    async getUser(data) {
      return client
        .select()
        .from(users)
        .where(eq(users.id, data))
        .then((res) => res[0] ?? null);
    },
    async getUserByEmail(data) {
      return client
        .select()
        .from(users)
        .where(eq(users.email, data))
        .then((res) => res[0] ?? null);
    },
    async createSession(data) {
      return await client.insert(sessions).values(data).returning().get();
    },
    async getSessionAndUser(data) {
      return client
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res[0] ?? null);
    },
    updateUser(data) {
      if (!data.id) {
        throw new Error("No user id.");
      }

      return client
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()
        .get();
    },
    updateSession(data) {
      return client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .get();
    },
    async linkAccount(rawAccount) {
      const updatedAccount = await client
        .insert(accounts)
        .values(rawAccount)
        .returning()
        .then((res) => res[0] ?? null);

      const account: AdapterAccount = {
        ...updatedAccount,
        type: updatedAccount.type,
        access_token: updatedAccount.accessToken ?? undefined,
        token_type: updatedAccount.tokenType ?? undefined,
        id_token: updatedAccount.idToken ?? undefined,
        refresh_token: updatedAccount.refreshToken ?? undefined,
        scope: updatedAccount.scope ?? undefined,
        expires_at: updatedAccount.expiresAt ?? undefined,
        session_state: updatedAccount.sessionState ?? undefined,
      };

      return account;
    },
    async getUserByAccount(account) {
      const results = await client
        .select()
        .from(accounts)
        .leftJoin(users, eq(users.id, accounts.userId))
        .where(
          and(
            eq(accounts.provider, account.provider),
            eq(accounts.providerAccountId, account.providerAccountId)
          )
        )
        .then((res) => res[0] ?? null);

      return results?.user;
    },
    deleteSession(sessionToken) {
      return (
        client
          .delete(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .returning()
          .get() ?? null
      );
    },
    createVerificationToken(token) {
      return client.insert(verificationTokens).values(token).returning().get();
    },
    useVerificationToken(token) {
      try {
        return client
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token)
            )
          )
          .returning()
          .then((res) => res[0] ?? null);
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
    deleteUser(id) {
      return client.delete(users).where(eq(users.id, id)).returning().get();
    },
    unlinkAccount(account) {
      client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .run();

      return undefined;
    },
  };
}

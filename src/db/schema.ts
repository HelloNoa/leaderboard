import { pgTable, pgSchema, index, foreignKey, pgEnum, serial, text, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])

export const gameScore = pgSchema("game_score");

export type score = typeof score.$inferSelect;
export const score = gameScore.table("score", {
        id: serial("id").primaryKey().notNull(),
        gameId: serial("game_id").notNull().references(() => game.id, { onDelete: "restrict", onUpdate: "cascade" } ),
        user: text("user"),
        score: integer("score").default(0).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    },
    (table) => {
        return {
            gameIdx: index("game_index").on(table.gameId),
        }
    });

export type game = typeof game.$inferSelect;
export const game = gameScore.table("game", {
    id: serial("id").primaryKey().notNull(),
    title: text("title"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

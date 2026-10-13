import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const encounters=sqliteTable("encounters",{id:text("id").primaryKey(),createdAt:text("created_at").notNull(),payload:text("payload").notNull()});

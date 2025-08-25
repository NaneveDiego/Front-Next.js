import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const postTable = sqliteTable('post',{
    id: text('id').primaryKey(),
    title: text('title').notNull().unique(),
    createdAt: text('created_at').notNull(),
   
});

export type PostTableSelectModel = InferSelectModel<typeof postTable>
export type PostTableInsertModel = InferInsertModel<typeof postTable>
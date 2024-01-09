import {
  int,
  text,
  mysqlTable,
  bigint,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const users = mysqlTable("users", {
  username: varchar("username", { length: 256 }).primaryKey(),
  password: varchar("password", { length: 256 }),
});

export const userRelations = relations(users, ({ many }) => ({
  lobbys: many(lobbys),
}));

export const lobbys = mysqlTable("lobbys", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 256 }),
  authorId: varchar("author_id", { length: 256 })
    .notNull()
    .references(() => users.username),
});

export const lobbyRelations = relations(lobbys, ({ one, many }) => ({
  author: one(users, {
    fields: [lobbys.authorId],
    references: [users.username],
  }),
  choices: many(questions),
}));

export const questions = mysqlTable("questions", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 256 }),
  lobbyId: int("lobby_id")
    .notNull()
    .references(() => lobbys.id),
});

export const questionRelations = relations(questions, ({ many }) => ({
  questionId: many(questions),
}));

export const choices = mysqlTable("choices", {
  id: serial("id").primaryKey(),
  questionId: int("question_id")
    .notNull()
    .references(() => questions.id),
});

export const choiceRelations = relations(choices, ({ one }) => ({
  question: one(),
}));

/**
 * This is the schema design for the sgflashcard_db database.
 * For initial setup with a reset database, run the following commands:
 * 1. Remove the db_data foler in the root directory, and then create it again (Ensure it is empty).
 * 2. Start the docker container using: > docker-compose up -d
 * 2. Run the schema create command to create the tables: > npx drizzle-kit push
 *
 * To stop the docker container, run: > docker-compose down
 */

import {
  integer,
  json,
  pgTable,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

/** Users Module */
export const usersTable = pgTable('users', {
  uid: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 128 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isEmailVerified: boolean().notNull().default(false),
  password: varchar({ length: 255 }).notNull(),
  salt: varchar({ length: 255 }).notNull(),
  avatar: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 32 }).notNull(),
});

export const sessionsTable = pgTable('sessions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .unique()
    .references(() => usersTable.uid),
  token: varchar({ length: 255 }).notNull(),
  loginAt: timestamp({ withTimezone: true }),
});

/** Flash cards and Lessons Module */
export const flashcardTable = pgTable('flashcards', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: json().notNull(),
  subject: varchar({ length: 32 }).notNull(),
  level: varchar({ length: 32 }).notNull(),
  creatorId: integer()
    .notNull()
    .references(() => usersTable.uid),
  createdAt: timestamp({ withTimezone: true }),
  updatedAt: timestamp({ withTimezone: true }),
});

export const lessonTable = pgTable('lessons', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 128 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  flashcards: json().notNull(),
  subject: varchar({ length: 32 }).notNull(),
  level: varchar({ length: 32 }).notNull(),
  creatorId: integer()
    .notNull()
    .references(() => usersTable.uid),
  createdAt: timestamp({ withTimezone: true }),
  updatedAt: timestamp({ withTimezone: true }),
});

export const subjectTable = pgTable('subjects', {
  content: json().notNull(),
});

export const levelTable = pgTable('levels', {
  content: json().notNull(),
});

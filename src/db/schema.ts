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
  pgEnum,
  text,
} from 'drizzle-orm/pg-core';

const timestamps = {
  createAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updateAt: timestamp({ withTimezone: true }),
};

export const rolesEnum = pgEnum('roles', [
  'admin',
  'tutor',
  'mentor',
  'student',
]);

/** Users Module */
export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uid: varchar({ length: 36 }).unique().notNull(),
  name: varchar({ length: 128 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isEmailVerified: boolean().notNull().default(false),
  password: varchar({ length: 255 }).notNull(), // example: 1aae2773fff897b9c9218f3f67a327cb67329062f8d82c4d893a062b1570393b (64)
  salt: varchar({ length: 255 }).notNull(), // example: 1f882e43631b002fe81e30061414809e (32)
  avatar: text().notNull(), // to store image as base64 (keep image small)
  role: rolesEnum('roles').default('student'),
  ...timestamps,
});

export const sessionsTable = pgTable('sessions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .unique()
    .references(() => usersTable.id),
  token: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

/** Flash cards and Lessons Module */
export const flashcardTable = pgTable('flashcards', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: json().notNull(),
  subject: varchar({ length: 32 }).notNull(),
  level: varchar({ length: 32 }).notNull(),
  creatorId: integer()
    .notNull()
    .references(() => usersTable.id),
  ...timestamps,
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
    .references(() => usersTable.id),
  ...timestamps,
});

export const subjectTable = pgTable('subjects', {
  content: json().notNull(),
});

export const levelTable = pgTable('levels', {
  content: json().notNull(),
});

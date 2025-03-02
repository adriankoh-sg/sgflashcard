-- Adminer 4.8.1 PostgreSQL 17.4 (Debian 17.4-1.pgdg120+2) dump

DROP TABLE IF EXISTS "flashcards";
CREATE TABLE "public"."flashcards" (
    "id" integer DEFAULT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "content" json NOT NULL,
    "subject" character varying(32) NOT NULL,
    "level" character varying(32) NOT NULL,
    "creatorId" integer NOT NULL,
    "createdAt" timestamptz,
    "updatedAt" timestamptz,
    CONSTRAINT "flashcards_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "lessons";
CREATE TABLE "public"."lessons" (
    "id" integer DEFAULT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "title" character varying(128) NOT NULL,
    "description" character varying(255) NOT NULL,
    "flashcards" json NOT NULL,
    "subject" character varying(32) NOT NULL,
    "level" character varying(32) NOT NULL,
    "creatorId" integer NOT NULL,
    "createdAt" timestamptz,
    "updatedAt" timestamptz,
    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "levels";
CREATE TABLE "public"."levels" (
    "content" json NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "sessions";
CREATE TABLE "public"."sessions" (
    "id" integer DEFAULT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "userId" integer NOT NULL,
    "token" character varying(255) NOT NULL,
    "loginAt" timestamptz,
    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "sessions_userId_unique" UNIQUE ("userId")
) WITH (oids = false);


DROP TABLE IF EXISTS "subjects";
CREATE TABLE "public"."subjects" (
    "content" json NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "users";
CREATE TABLE "public"."users" (
    "id" integer DEFAULT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "name" character varying(128) NOT NULL,
    "email" character varying(255) NOT NULL,
    "password" character varying(255) NOT NULL,
    "salt" character varying(255) NOT NULL,
    "avatar" character varying(255) NOT NULL,
    "role" character varying(32) NOT NULL,
    CONSTRAINT "users_email_unique" UNIQUE ("email"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."flashcards" ADD CONSTRAINT "flashcards_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES users(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."lessons" ADD CONSTRAINT "lessons_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES users(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES users(id) NOT DEFERRABLE;

ALTER TABLE "user" ADD COLUMN "email" text;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_email_idx" ON "user" ("email");
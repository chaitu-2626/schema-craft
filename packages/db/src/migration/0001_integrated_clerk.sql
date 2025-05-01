ALTER TABLE "USER" DROP CONSTRAINT "USER_email_unique";--> statement-breakpoint
ALTER TABLE "USER" DROP CONSTRAINT "name_check";--> statement-breakpoint
ALTER TABLE "USER" ADD COLUMN "clerk_id" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "USER" ADD COLUMN "userRole" "user_role" DEFAULT 'viewer';--> statement-breakpoint
ALTER TABLE "USER" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "USER" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "USER" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "USER" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "USER" DROP COLUMN "profile_photo";--> statement-breakpoint
ALTER TABLE "USER" DROP COLUMN "two_factor_enabled";--> statement-breakpoint
ALTER TABLE "USER" ADD CONSTRAINT "USER_clerk_id_unique" UNIQUE("clerk_id");
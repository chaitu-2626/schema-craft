ALTER TABLE "ERD_ATTRIBUTE" ALTER COLUMN "erd_updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "ERD_DIAGRAM" ALTER COLUMN "visibility" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ERD_DIAGRAM" ALTER COLUMN "databaseType" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ERD_RELATIONSHIP" ALTER COLUMN "relationshipType" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "TEAM_MEMBER" ALTER COLUMN "userRole" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "USER" ALTER COLUMN "userRole" SET NOT NULL;
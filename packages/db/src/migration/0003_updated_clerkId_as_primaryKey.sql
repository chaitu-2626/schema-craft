ALTER TABLE "USER" RENAME COLUMN "id" TO "user_id";--> statement-breakpoint
ALTER TABLE "USER" DROP CONSTRAINT "USER_clerk_id_unique";--> statement-breakpoint
ALTER TABLE "ERD_ATTRIBUTE" DROP CONSTRAINT "ERD_ATTRIBUTE_erd_created_by_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "ERD_ATTRIBUTE" DROP CONSTRAINT "ERD_ATTRIBUTE_erd_updated_by_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "ERD_DIAGRAM" DROP CONSTRAINT "ERD_DIAGRAM_erd_owner_id_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "ERD_DIAGRAM" DROP CONSTRAINT "ERD_DIAGRAM_erd_diagram_updated_by_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "ERD_ENTITY" DROP CONSTRAINT "ERD_ENTITY_erd_created_by_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "ERD_ENTITY" DROP CONSTRAINT "ERD_ENTITY_erd_updated_by_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "ERD_RELATIONSHIP" DROP CONSTRAINT "ERD_RELATIONSHIP_erd_created_by_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "ERD_RELATIONSHIP" DROP CONSTRAINT "ERD_RELATIONSHIP_erd_updated_by_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "FAVORITE" DROP CONSTRAINT "FAVORITE_user_id_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "TEAM_MEMBER" DROP CONSTRAINT "TEAM_MEMBER_user_id_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "TEAM" DROP CONSTRAINT "TEAM_owner_id_USER_id_fk";
--> statement-breakpoint
ALTER TABLE "TEAM" DROP CONSTRAINT "TEAM_updated_by_USER_id_fk";
--> statement-breakpoint
DROP INDEX "clerk_id_idx";--> statement-breakpoint
ALTER TABLE "ERD_ATTRIBUTE" ADD CONSTRAINT "ERD_ATTRIBUTE_erd_created_by_USER_user_id_fk" FOREIGN KEY ("erd_created_by") REFERENCES "public"."USER"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_ATTRIBUTE" ADD CONSTRAINT "ERD_ATTRIBUTE_erd_updated_by_USER_user_id_fk" FOREIGN KEY ("erd_updated_by") REFERENCES "public"."USER"("user_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_DIAGRAM" ADD CONSTRAINT "ERD_DIAGRAM_erd_owner_id_USER_user_id_fk" FOREIGN KEY ("erd_owner_id") REFERENCES "public"."USER"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_DIAGRAM" ADD CONSTRAINT "ERD_DIAGRAM_erd_diagram_updated_by_USER_user_id_fk" FOREIGN KEY ("erd_diagram_updated_by") REFERENCES "public"."USER"("user_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_ENTITY" ADD CONSTRAINT "ERD_ENTITY_erd_created_by_USER_user_id_fk" FOREIGN KEY ("erd_created_by") REFERENCES "public"."USER"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_ENTITY" ADD CONSTRAINT "ERD_ENTITY_erd_updated_by_USER_user_id_fk" FOREIGN KEY ("erd_updated_by") REFERENCES "public"."USER"("user_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_RELATIONSHIP" ADD CONSTRAINT "ERD_RELATIONSHIP_erd_created_by_USER_user_id_fk" FOREIGN KEY ("erd_created_by") REFERENCES "public"."USER"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_RELATIONSHIP" ADD CONSTRAINT "ERD_RELATIONSHIP_erd_updated_by_USER_user_id_fk" FOREIGN KEY ("erd_updated_by") REFERENCES "public"."USER"("user_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FAVORITE" ADD CONSTRAINT "FAVORITE_user_id_USER_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."USER"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TEAM_MEMBER" ADD CONSTRAINT "TEAM_MEMBER_user_id_USER_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."USER"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TEAM" ADD CONSTRAINT "TEAM_owner_id_USER_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."USER"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TEAM" ADD CONSTRAINT "TEAM_updated_by_USER_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."USER"("user_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "USER" DROP COLUMN "clerk_id";--> statement-breakpoint
ALTER TABLE "USER" ADD CONSTRAINT "USER_user_id_unique" UNIQUE("user_id");
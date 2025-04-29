CREATE TYPE "public"."erd_data_type" AS ENUM('TINYINT', 'SMALLINT', 'MEDIUMINT', 'INT', 'INTEGER', 'BIGINT', 'DECIMAL', 'NUMERIC', 'FLOAT', 'DOUBLE', 'BIT', 'BOOLEAN', 'CHAR', 'VARCHAR', 'TINYTEXT', 'TEXT', 'MEDIUMTEXT', 'LONGTEXT', 'BINARY', 'VARBINARY', 'TINYBLOB', 'BLOB', 'MEDIUMBLOB', 'LONGBLOB', 'ENUM', 'SET', 'DATE', 'DATETIME', 'TIMESTAMP', 'TIME', 'YEAR', 'JSON', 'GEOMETRY', 'POINT', 'LINESTRING', 'POLYGON', 'MULTIPOINT', 'MULTILINESTRING', 'MULTIPOLYGON', 'GEOMETRYCOLLECTION');--> statement-breakpoint
CREATE TYPE "public"."erd_diagram_database_type" AS ENUM('mysql', 'postgresql', 'sqlserver');--> statement-breakpoint
CREATE TYPE "public"."erd_index_type" AS ENUM('primary', 'unique', 'index', 'none');--> statement-breakpoint
CREATE TYPE "public"."erd_relationship_type" AS ENUM('1:1', '1:n', 'n:1', 'none');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'editor', 'viewer');--> statement-breakpoint
CREATE TYPE "public"."erd_diagram_visibility" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TABLE "ERD_ATTRIBUTE" (
	"erd_attribute_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"erd_entity_id" uuid NOT NULL,
	"erd_attribute_name" varchar(255) NOT NULL,
	"dataType" "erd_data_type" DEFAULT 'INT' NOT NULL,
	"erd_is_nullable" boolean DEFAULT false,
	"erd_is_auto_increment" boolean DEFAULT false,
	"erd_is_unsigned" boolean DEFAULT false,
	"indexType" "erd_index_type" DEFAULT 'none' NOT NULL,
	"erd_default_value" varchar(255),
	"erd_enum_values" varchar(500),
	"erd_column_index" integer DEFAULT 0 NOT NULL,
	"erd_created_at" timestamp DEFAULT now() NOT NULL,
	"erd_created_by" uuid NOT NULL,
	"erd_updated_at" timestamp DEFAULT now(),
	"erd_updated_by" uuid,
	CONSTRAINT "check_column_index_non_negative" CHECK ("ERD_ATTRIBUTE"."erd_column_index" >= 0)
);
--> statement-breakpoint
CREATE TABLE "ERD_DIAGRAM" (
	"erd_diagram_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"erd_team_id" uuid NOT NULL,
	"erd_owner_id" uuid NOT NULL,
	"erd_diagram_name" varchar(300) NOT NULL,
	"visibility" "erd_diagram_visibility" DEFAULT 'private',
	"erd_diagram_created_at" timestamp DEFAULT now(),
	"erd_diagram_updated_at" timestamp,
	"erd_diagram_updated_by" uuid,
	"databaseType" "erd_diagram_database_type" DEFAULT 'mysql'
);
--> statement-breakpoint
CREATE TABLE "ERD_ENTITY" (
	"erd_entity_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"erd_diagram_id" uuid NOT NULL,
	"erd_entity_name" varchar(200) NOT NULL,
	"erd_entity_color" varchar(100) NOT NULL,
	"erd_created_at" timestamp DEFAULT now(),
	"erd_created_by" uuid NOT NULL,
	"erd_updated_at" timestamp,
	"erd_updated_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ERD_RELATIONSHIP" (
	"erd_from_attribute_id" uuid NOT NULL,
	"erd_to_attribute_id" uuid NOT NULL,
	"relationshipType" "erd_relationship_type" DEFAULT 'none',
	"erd_created_at" timestamp DEFAULT now() NOT NULL,
	"erd_created_by" uuid NOT NULL,
	"erd_updated_at" timestamp,
	"erd_updated_by" uuid NOT NULL,
	CONSTRAINT "ERD_RELATIONSHIP_erd_from_attribute_id_erd_to_attribute_id_pk" PRIMARY KEY("erd_from_attribute_id","erd_to_attribute_id")
);
--> statement-breakpoint
CREATE TABLE "FAVORITE" (
	"team_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"erd_diagram_id" uuid NOT NULL,
	"favorite_at" timestamp DEFAULT now(),
	CONSTRAINT "FAVORITE_user_id_erd_diagram_id_pk" PRIMARY KEY("user_id","erd_diagram_id")
);
--> statement-breakpoint
CREATE TABLE "TEAM_MEMBER" (
	"team_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"userRole" "user_role" DEFAULT 'viewer',
	"joined_at" timestamp,
	"invited_at" timestamp DEFAULT now(),
	"invite_accepted" boolean DEFAULT false,
	CONSTRAINT "TEAM_MEMBER_team_id_user_id_pk" PRIMARY KEY("team_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "TEAM" (
	"team_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo_photo" varchar(1024),
	"owner_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "USER" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"profile_photo" varchar(1024),
	"two_factor_enabled" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "USER_email_unique" UNIQUE("email"),
	CONSTRAINT "name_check" CHECK (LENGTH("USER"."name") >= 4)
);
--> statement-breakpoint
ALTER TABLE "ERD_ATTRIBUTE" ADD CONSTRAINT "ERD_ATTRIBUTE_erd_entity_id_ERD_ENTITY_erd_entity_id_fk" FOREIGN KEY ("erd_entity_id") REFERENCES "public"."ERD_ENTITY"("erd_entity_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_ATTRIBUTE" ADD CONSTRAINT "ERD_ATTRIBUTE_erd_created_by_USER_id_fk" FOREIGN KEY ("erd_created_by") REFERENCES "public"."USER"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_ATTRIBUTE" ADD CONSTRAINT "ERD_ATTRIBUTE_erd_updated_by_USER_id_fk" FOREIGN KEY ("erd_updated_by") REFERENCES "public"."USER"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_DIAGRAM" ADD CONSTRAINT "ERD_DIAGRAM_erd_team_id_TEAM_team_id_fk" FOREIGN KEY ("erd_team_id") REFERENCES "public"."TEAM"("team_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_DIAGRAM" ADD CONSTRAINT "ERD_DIAGRAM_erd_owner_id_USER_id_fk" FOREIGN KEY ("erd_owner_id") REFERENCES "public"."USER"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_DIAGRAM" ADD CONSTRAINT "ERD_DIAGRAM_erd_diagram_updated_by_USER_id_fk" FOREIGN KEY ("erd_diagram_updated_by") REFERENCES "public"."USER"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_ENTITY" ADD CONSTRAINT "ERD_ENTITY_erd_diagram_id_ERD_DIAGRAM_erd_diagram_id_fk" FOREIGN KEY ("erd_diagram_id") REFERENCES "public"."ERD_DIAGRAM"("erd_diagram_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_ENTITY" ADD CONSTRAINT "ERD_ENTITY_erd_created_by_USER_id_fk" FOREIGN KEY ("erd_created_by") REFERENCES "public"."USER"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_ENTITY" ADD CONSTRAINT "ERD_ENTITY_erd_updated_by_USER_id_fk" FOREIGN KEY ("erd_updated_by") REFERENCES "public"."USER"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_RELATIONSHIP" ADD CONSTRAINT "ERD_RELATIONSHIP_erd_from_attribute_id_ERD_ATTRIBUTE_erd_attribute_id_fk" FOREIGN KEY ("erd_from_attribute_id") REFERENCES "public"."ERD_ATTRIBUTE"("erd_attribute_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_RELATIONSHIP" ADD CONSTRAINT "ERD_RELATIONSHIP_erd_to_attribute_id_ERD_ATTRIBUTE_erd_attribute_id_fk" FOREIGN KEY ("erd_to_attribute_id") REFERENCES "public"."ERD_ATTRIBUTE"("erd_attribute_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_RELATIONSHIP" ADD CONSTRAINT "ERD_RELATIONSHIP_erd_created_by_USER_id_fk" FOREIGN KEY ("erd_created_by") REFERENCES "public"."USER"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ERD_RELATIONSHIP" ADD CONSTRAINT "ERD_RELATIONSHIP_erd_updated_by_USER_id_fk" FOREIGN KEY ("erd_updated_by") REFERENCES "public"."USER"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FAVORITE" ADD CONSTRAINT "FAVORITE_team_id_TEAM_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."TEAM"("team_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FAVORITE" ADD CONSTRAINT "FAVORITE_user_id_USER_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."USER"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FAVORITE" ADD CONSTRAINT "FAVORITE_erd_diagram_id_ERD_DIAGRAM_erd_diagram_id_fk" FOREIGN KEY ("erd_diagram_id") REFERENCES "public"."ERD_DIAGRAM"("erd_diagram_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TEAM_MEMBER" ADD CONSTRAINT "TEAM_MEMBER_team_id_TEAM_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."TEAM"("team_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TEAM_MEMBER" ADD CONSTRAINT "TEAM_MEMBER_user_id_USER_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."USER"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TEAM" ADD CONSTRAINT "TEAM_owner_id_USER_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."USER"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TEAM" ADD CONSTRAINT "TEAM_updated_by_USER_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."USER"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_erd_attribute_entity_id" ON "ERD_ATTRIBUTE" USING btree ("erd_entity_id");--> statement-breakpoint
CREATE INDEX "idx_erd_diagram_team_id" ON "ERD_DIAGRAM" USING btree ("erd_team_id");--> statement-breakpoint
CREATE INDEX "idx_erd_diagram_owner_id" ON "ERD_DIAGRAM" USING btree ("erd_owner_id");--> statement-breakpoint
CREATE INDEX "idx_erd_entity_diagram_id" ON "ERD_ENTITY" USING btree ("erd_diagram_id");--> statement-breakpoint
CREATE INDEX "idx_erd_relationship_from_attribute_id" ON "ERD_RELATIONSHIP" USING btree ("erd_from_attribute_id");--> statement-breakpoint
CREATE INDEX "idx_erd_relationship_to_attribute_id" ON "ERD_RELATIONSHIP" USING btree ("erd_to_attribute_id");--> statement-breakpoint
CREATE INDEX "idx_favorite_team_id" ON "FAVORITE" USING btree ("team_id");--> statement-breakpoint
CREATE INDEX "idx_favorite_user_id" ON "FAVORITE" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_team_member_team_id" ON "TEAM_MEMBER" USING btree ("team_id");--> statement-breakpoint
CREATE INDEX "idx_team_member_user_id" ON "TEAM_MEMBER" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_team_owner_id" ON "TEAM" USING btree ("owner_id");
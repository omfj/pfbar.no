CREATE TABLE IF NOT EXISTS "product" (
	"id" varchar(21) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"in_stock" boolean DEFAULT false NOT NULL,
	"image" text NOT NULL,
	CONSTRAINT product_id_pk PRIMARY KEY("id")
);

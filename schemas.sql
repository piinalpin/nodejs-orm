CREATE SEQUENCE id_transaction_seq start 1 increment 1;
CREATE SEQUENCE id_transaction_detail_seq start 1 increment 1;

CREATE TABLE "transaction" (
  "id" bigint PRIMARY KEY NOT NULL DEFAULT nextval('id_transaction_seq'),
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
  "transaction_ref_number" varchar(255) NOT NULL,
  "transaction_date" TIMESTAMP NOT NULL,
  "customer_name" varchar(255) NOT NULL,
  "cost" bigint NOT NULL,
  "shipping_cost" bigint NOT NULL
);

CREATE TABLE "transaction_detail" (
  "id" bigint PRIMARY KEY NOT NULL DEFAULT nextval('id_transaction_detail_seq'),
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
  "transaction_id" bigint NOT NULL,
  "stuff" varchar(255) NOT NULL,
  "price" bigint NOT NULL,
  "qty" int NOT NULL,
  "total" bigint NOT NULL,
  CONSTRAINT fk_transaction FOREIGN KEY (transaction_id) REFERENCES transaction(id)
);
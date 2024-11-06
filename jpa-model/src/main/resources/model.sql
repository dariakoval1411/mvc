CREATE TABLE mvc.customers (
	id numeric(18) NOT NULL,
	"name" varchar NOT NULL,
	nip varchar(10) NOT NULL,
	street varchar(100) NULL,
	zip_code varchar(10) NULL,
	city varchar(100) NULL,
	CONSTRAINT cust_pk PRIMARY KEY (id)
);
CREATE TABLE mvc.invoices (
	id numeric(18) NOT NULL,
	cust_id numeric(18) NOT NULL,
	invoice_number varchar(20) NOT NULL,
	issue_date timestamptz NOT NULL,
	sell_date timestamptz NOT NULL,
	description varchar(100) NOT NULL,
	net_price numeric(12, 2) NOT NULL,
	gross_price numeric(12, 2) NOT NULL,
	vat_rate numeric(5, 2) NOT NULL,
	due_date timestamptz NOT NULL,
	issuer varchar(100) NOT NULL,
	payment_type varchar(100) NOT NULL,
	CONSTRAINT invo_pk PRIMARY KEY (id),
	CONSTRAINT invo_cust_fk FOREIGN KEY (cust_id) REFERENCES mvc.customers(id)
);

create sequence customers_seq;
create sequence invoices_seq;
CREATE TABLE PRODUCTS (
    ID    BIGINT          NOT NULL,
    NAME  VARCHAR ( 100 ) NOT NULL,
    CONSTRAINT PRODUCTS_PK PRIMARY KEY (ID)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE INDEX PRODUCTS_NAME_IDX USING BTREE ON PRODUCTS ( NAME );

CREATE TABLE CUSTOMERS (
    ID      BIGINT         NOT NULL,
    NAME    VARCHAR ( 50 ) NOT NULL,
    SURNAME VARCHAR ( 50 ) NOT NULL,
    AGE     INTEGER        NOT NULL,
    CONSTRAINT CUSTOMERS_PK PRIMARY KEY (ID)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE INDEX CUSTOMERS_NAME_IDX USING BTREE ON CUSTOMERS ( NAME );
CREATE INDEX CUSTOMERS_SURNAME_IDX USING BTREE ON CUSTOMERS ( SURNAME );

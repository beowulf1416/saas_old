/**
 * create database
 * run as user with superuser privilege
 */

/**
 * enable pgcrypto extension
 */
set schema 'public';
create extension if not exists pgcrypto;


-- http://www.regular-expressions.info/email.html
create domain email_address
  text not null
  constraint chk_email
  check(
    length(value) < 254
    and
    value ~ '^[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[a-zA-Z]{2,63}$'
 );

-- url segment friendly text
create domain slug
  varchar(200) not null
  constraint chk_slug
   check (
    length(value) < 200
    and
    value ~ '^[a-z0-9._+-]+$'
  );


-- create schema and tables
\ir clients/create.sql
\ir common/create.sql
\ir iam/create.sql
\ir accounting/create.sql
\ir crm/create.sql
\ir hr/create.sql
\ir inventory/create.sql

-- create functions and procedures
\ir clients/sp.sql
\ir common/sp.sql
\ir iam/sp.sql
\ir accounting/sp.sql
\ir crm/sp.sql
\ir hr/sp.sql
\ir inventory/sp.sql

set schema 'public';
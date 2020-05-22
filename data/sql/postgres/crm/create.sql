/**
 * customer relations management
 */
create schema if not exists crm;
set schema 'crm';

\ir tables/contacts.sql

set schema 'public';
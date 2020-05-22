/**
 * customer relations management
 */
create schema if not exists crm;
set schema 'crm';

\ir tables/contacts.sql
\ir tables/contact_emails.sql
\ir tables/contact_numbers.sql
\ir tables/contact_addresses.sql

set schema 'public';
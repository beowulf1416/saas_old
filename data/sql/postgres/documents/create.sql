/**
 * accounting
 */
\echo '** DOCUMENTS **'

create schema if not exists documents;
set schema 'documents';

\ir tables/documents.sql


set schema 'public';
/**
 * accounting
 */
create schema if not exists accounting;
set schema 'accounting';


/** tables **/
\ir tables/account_types.sql

\ir tables/accounts.sql
\ir tables/account_tree.sql
\ir tables/account_balances.sql


/** functions **/



set schema 'public';
/**
 * accounting
 */
\echo '** ACCOUNTING **'

create schema if not exists accounting;
set schema 'accounting';

/** tables **/
\ir tables/account_types.sql

\ir tables/accounts.sql
-- \ir tables/account_tree.sql
\ir tables/account_balances.sql

\ir tables/account_groups.sql
\ir tables/account_group.sql
\ir tables/account_group_tree.sql

\ir tables/transactions.sql
\ir tables/transaction_items.sql


set schema 'public';
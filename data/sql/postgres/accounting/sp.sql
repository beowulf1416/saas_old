/**
 * accounting
 */
set schema 'accounting';


/** functions **/
\ir procs/accounts/account_types_all.sql

\ir procs/accounts/account_add.sql
\ir procs/accounts/account_get.sql
\ir procs/accounts/account_assign_parent.sql
\ir procs/accounts/accounts_filter.sql



set schema 'public';
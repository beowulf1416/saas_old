/**
 * accounting
 */
set schema 'accounting';


/** functions **/
\ir procs/accounts/account_types_all.sql

\ir procs/accounts/account_add.sql
\ir procs/accounts/account_get.sql
-- \ir procs/accounts/account_assign_parent.sql
\ir procs/accounts/accounts_all.sql
\ir procs/accounts/accounts_filter.sql
-- \ir procs/accounts/account_get_children.sql
-- \ir procs/accounts/account_tree_all.sql

\ir procs/groups/account_group_add.sql
\ir procs/groups/account_group_assign_parent.sql
\ir procs/groups/account_group_tree.sql



set schema 'public';
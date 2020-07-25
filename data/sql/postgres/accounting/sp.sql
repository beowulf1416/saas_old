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

\ir procs/transactions/transaction_add.sql
\ir procs/transactions/transaction_update.sql
\ir procs/transactions/transaction_get.sql
\ir procs/transactions/transactions_filter.sql
\ir procs/transactions/transaction_post.sql

\ir procs/transactions/transaction_item_add.sql
\ir procs/transactions/transaction_item_update.sql
\ir procs/transactions/transaction_item_remove.sql
\ir procs/transactions/transaction_items_get.sql

\ir procs/transactions/transaction_attachment_add.sql
\ir procs/transactions/transaction_attachment_remove.sql
\ir procs/transactions/transaction_attachments_get.sql


set schema 'public';
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


/** init **/
-- create root account for default client
do $$
declare
    default_client_id clients.clients.id%type;
begin
    -- get default client
    select
        a.id into default_client_id
    from clients.clients a
    where a.name = 'default';

    insert into accounting.accounts (client_id, type_id, name, description) values
    (default_client_id, 0, 'root', 'root account');
end
$$
language plpgsql;



set schema 'public';
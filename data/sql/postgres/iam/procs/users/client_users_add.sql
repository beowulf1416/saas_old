/**
 * add user to client
 */
create or replace function client_users_add (
    p_client_id clients.clients.id%type,
    p_user_id iam.users.id%type
)
returns void
as $$
begin
    insert into iam.user_clients (
        user_id,
        client_id
    ) values (
        p_user_id,
        p_client_id
    );
end
$$
language plpgsql;
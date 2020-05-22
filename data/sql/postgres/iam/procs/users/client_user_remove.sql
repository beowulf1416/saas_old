/**
 * remove user from client
 */
create or replace function client_user_remove (
    p_client_id clients.clients.id%type,
    p_user_id iam.users.id%type
)
returns void
as $$
begin
    delete from iam.user_clients
    where client_id = p_client_id
        and user_id = p_user_id;

    delete from iam.role_users
    where client_id = p_client_id
        and user_id = p_user_id;
end
$$
language plpgsql;
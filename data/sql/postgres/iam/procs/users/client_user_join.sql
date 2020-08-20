/**
 * user request to join client
 */
create or replace function client_user_join (
    p_client_id clients.clients.id%type,
    p_user_id iam.users.id%type
)
returns void
as $$
begin
    insert into iam.user_clients (
        -- active,
        user_id,
        client_id
    ) values (
        -- false,
        p_user_id,
        p_client_id
    );
end
$$
language plpgsql;
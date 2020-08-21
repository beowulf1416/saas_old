/**
 * add user to client
 */
create or replace function client_user_add (
    p_client_id clients.clients.id%type,
    p_user_id iam.users.id%type
)
returns void
as $$
declare
    t_role_id iam.roles.id%type;
begin
    insert into iam.user_clients (
        user_id,
        client_id
    ) values (
        p_user_id,
        p_client_id
    );

    -- add user to 'everyone' role
    t_role_id := iam.role_by_name('everyone');
    iam.role_assign_user(
        p_client_id,
        t_role_id,
        p_user_id
    );
end
$$
language plpgsql;
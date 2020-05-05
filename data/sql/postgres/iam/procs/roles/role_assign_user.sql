/**
 * assign role to user
 */
create or replace function role_assign_user (
    p_client_id clients.clients.id%type,
    p_role_id iam.roles.id%type,
    p_user_id iam.users.id%type
)
returns void
as $$
begin
    insert into iam.role_users (
        client_id,
        role_id,
        user_id
    ) values (
        p_client_id,
        p_role_id,
        p_user_id
    )
    on conflict do nothing;
end
$$ 
language plpgsql;
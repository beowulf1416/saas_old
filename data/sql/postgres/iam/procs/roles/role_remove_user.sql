/**
 * remove role from user
 */
create or replace function role_remove_user (
    p_client_id clients.clients.id%type,
    p_role_id iam.roles.id%type,
    p_user_id iam.users.id%type
)
returns void
as $$
begin
    delete from iam.role_users
    where client_id = p_client_id
        and role_id = p_role_id
        and user_id = p_user_id;
end
$$ 
language plpgsql;
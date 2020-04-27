/**
 * revoke permission from role
 */
create or replace function permissions_role_revoke (
    p_client_id iam.role_permissions.client_id%type,
    p_role_id iam.role_permissions.role_id%type,
    p_permission_id iam.role_permissions.permission_id%type
)
returns void
as $$
begin
    delete from iam.role_permissions
    where client_id = p_client_id
        and role_id = p_role_id
        and permission_id = p_permission_id;
end
$$ language plpgsql;
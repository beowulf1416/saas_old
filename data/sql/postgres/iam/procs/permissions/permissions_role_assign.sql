/**
 * assign permission to role
 */
create or replace function permissions_role_assign (
    p_client_id iam.role_permissions.client_id%type,
    p_role_id iam.role_permissions.role_id%type,
    p_permission_id iam.role_permissions.permission_id%type
)
returns void
as $$
begin
    insert into iam.role_permissions rp (role_id, permission_id, client_id)  values 
    (p_role_id, p_permission_id, p_client_id)
    on conflict do nothing;
end
$$ language plpgsql;
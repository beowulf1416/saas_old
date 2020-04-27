/**
 * retrieve permissions for a role
 */
create or replace function permissions_role (
    p_client_id clients.clients.id%type,
    p_role_id iam.roles.id%type
)
returns table (
    id iam.permissions.id%type,
    active iam.permissions.active%type,
    name iam.permissions.name%type
)
as $$
begin
    return query
    select
        distinct p.id,
        p.active,
        p.name
    from iam.permissions p
        inner join iam.role_permissions rp on p.id = rp.permission_id
        inner join iam.roles r on rp.role_id = r.id
    where r.id = p_role_id
        and r.client_id = p_client_id;
end
$$ language plpgsql;
create or replace function permissions_user_all (
    p_user_id iam.users.id%type,
    p_client_id clients.clients.id%type
)
returns table (
    name iam.permissions.name%type
)
as $$
begin
    return query
    select
        distinct p.name
    from iam.permissions p
        inner join iam.role_permissions rp on p.id = rp.permission_id
        inner join iam.role_users ru on rp.role_id = ru.role_id
        inner join iam.users u on ru.user_id = u.id
        inner join iam.roles r on r.id = ru.role_id
        inner join clients.clients c on r.client_id = c.id
    where 
        u.active = true
        and r.active = true
        and c.active = true
        and u.id = p_user_id
        and c.id = p_client_id;
end
$$
language plpgsql;
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
    where
        rp.client_id = p_client_id
        and ru.client_id = p_client_id
        and ru.user_id = p_user_id;
end
$$
language plpgsql;
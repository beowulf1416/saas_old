/**
 * retrieve all roles associated with client and user
 */
create or replace function client_user_roles (
    p_client_id clients.clients.id%type,
    p_user_id iam.users.id%type
)
returns table (
    id iam.roles.id%type,
    active iam.roles.active%type,
    name iam.roles.name%type
)
as $$
begin
    return query
    select
        r.id,
        r.active,
        r.name
    from iam.roles r
        inner join iam.role_users ru on r.id = ru.role_id
    where r.client_id = p_client_id
        and ru.user_id = p_user_id;
end
$$
language plpgsql;
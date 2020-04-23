/**
 * retrieve all roles available to a client
 */
create or replace function roles_all(
    p_client_id clients.clients.id%type
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
        distinct r.id,
            r.active,
            r.name
    from iam.roles r
        inner join iam.role_clients rc on r.id = rc.role_id;
end
$$
language plpgsql;
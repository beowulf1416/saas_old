/**
 * retrieve all roles associated with client
 */
create or replace function client_roles_all (
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
        r.id,
        r.active,
        r.name
    from iam.roles r
    where r.client_id = p_client_id;
end
$$ 
language plpgsql;
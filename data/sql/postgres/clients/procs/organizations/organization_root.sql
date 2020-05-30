/**
 * get root organization
 */
create or replace function organization_root(
    p_client_id clients.clients.id%type
)
returns clients.organizations.id%type
as $$
declare
    t_root_id clients.organizations.id%type;
begin
    select
        a.id into t_root_id
    from clients.organizations a
    where a.client_id = p_client_id
        and a.name = 'root';

    return t_root_id;
end
$$
language plpgsql
stable;
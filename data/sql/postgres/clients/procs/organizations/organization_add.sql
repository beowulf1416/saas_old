/**
 * add an organization to a client
 */
create or replace function organization_add (
    p_client_id clients.clients.id%type,
    p_name clients.organizations.name%type,
    p_description clients.organizations.description%type
)
returns clients.organizations.id%type
as $$
declare
    t_org_id clients.organizations.id%type;
begin
    insert into clients.organizations (
        client_id,
        name,
        description
    ) values (
        p_client_id,
        p_name,
        p_description
    )
    returning id into t_org_id;
end
$$
language plpgsql;
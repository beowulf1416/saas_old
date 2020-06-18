create or replace function organization_update (
    p_client_id clients.clients.id%type,
    p_org_id clients.organizations.id%type,
    p_name clients.organizations.name%type,
    p_description clients.organizations.description%type
)
returns void
as $$
begin
    update clients.organizations set
        name = p_name,
        description = p_description
    where client_id = p_client_id
        and id = p_org_id;
end
$$
language plpgsql;
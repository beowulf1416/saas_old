create or replace function organization_add (
    p_client_id clients.clients.id%type,
    p_name crm.organizations.name%type,
    p_description crm.organizations.description%type
)
returns crm.organizations.id%type
as $$
declare
    t_org_id crm.organizations.id%type;
begin
    insert into crm.organizations (
        client_id,
        name,
        description
    ) values (
        p_client_id,
        p_name,
        p_description
    )
    returning id into t_org_id;

    return t_org_id;
end
$$
language plpgsql;
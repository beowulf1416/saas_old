create or replace function organization_save (
    p_client_id clients.clients.id%type,
    p_id crm.organizations.id%type,
    p_name crm.organizations.name%type,
    p_address crm.organizations.address%type,
    p_country_id crm.organizations.country_id%type
)
returns void
as $$
begin
    insert into crm.organizations (
        id,
        client_id,
        name,
        address,
        country_id
    ) values (
        p_id,
        p_client_id,
        p_name,
        p_address,
        p_country_id
    )
    on conflict (id) do update set
        name = p_name,
        address = p_address,
        country_id = p_country_id;
end
$$
language plpgsql;
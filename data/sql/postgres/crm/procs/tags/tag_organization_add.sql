create or replace function tag_organization_add (
    p_client_id clients.clients.id%type,
    p_org_id crm.organizaitons.id%type,
    p_tag_id crm.tags.id%type
)
return void
as $$
begin
    insert into crm.tag_organizations (
        client_id,
        organization_id,
        tag_id
    ) values (
        p_client_id,
        p_org_id,
        p_tag_id
    )
    on conflict do nothing;
end
$$
language plpgsql;

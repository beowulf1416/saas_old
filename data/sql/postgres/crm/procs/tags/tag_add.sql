create or replace function tag_add (
    p_client_id clients.clients.id%type,
    p_tag_id crm.tags.id%type,
    p_name crm.tags.name%type
)
returns void
as $$
begin
    insert into crm.tags (
        id,
        client_id,
        name
    ) values (
        p_tag_id,
        p_client_id,
        p_name
    )
    on conflict do nothing;
end
$$
language plpgsql;
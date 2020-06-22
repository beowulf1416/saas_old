create or replace function people_save (
    p_client_id clients.clients.id%type,
    p_people_id crm.people.id%type,
    p_first crm.people.first_name%type,
    p_middle crm.people.middle_name%type,
    p_last crm.people.last_name%type,
    p_prefix crm.people.prefix%type,
    p_suffix crm.people.suffix%type
)
returns void
as $$
declare
    t_people_id crm.people.id%type;
begin
    insert into crm.people (
        id,
        client_id,
        first_name,
        middle_name,
        last_name,
        prefix,
        suffix
    ) values (
        p_people_id,
        p_client_id,
        p_first,
        p_middle,
        p_last,
        p_prefix,
        p_suffix
    )
    on conflict (id)
    do update set
        first_name = p_first,
        middle_name = p_middle,
        last_name = p_last,
        prefix = p_prefix,
        suffix = p_suffix;
end
$$
language plpgsql;
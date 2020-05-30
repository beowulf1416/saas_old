create or replace function people_add (
    p_client_id clients.clients.id%type,
    p_first crm.people.first_name%type,
    p_middle crm.people.middle_name%type,
    p_last crm.people.last_name%type,
    p_prefix crm.people.prefix%type,
    p_suffix crm.people.suffix%type
)
returns crm.people.id%type
as $$
declare
    t_people_id crm.people.id%type;
begin
    insert into crm.people (
        client_id,
        first_name,
        middle_name,
        last_name,
        prefix,
        suffix
    ) values (
        p_client_id,
        p_first,
        p_middle,
        p_last,
        p_prefix,
        p_suffix
    )
    returning id into t_people_id;
end
$$
language plpgsql;
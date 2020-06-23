create or replace function people_ids_all (
    p_people_id crm.people.id%type
)
returns table (
    type_id crm.people_ids.id_type%type,
    value crm.people_ids.value%type
)
as $$
begin
    return query
    select
        a.id_type,
        a.value
    from crm.people_ids a
    where a.people_id = p_people_id;
end
$$
language plpgsql
stable;
create or replace function people_save_id (
    p_people_id crm.people.id%type,
    p_type_id crm.people_ids.id_type%type,
    p_value crm.people_ids.value%type
)
returns void
as $$
begin
    insert into crm.people_ids (
        people_id,
        id_type,
        value
    ) values (
        p_people_id,
        p_type_id,
        p_value
    )
    on conflict (people_id, id_type) do update set
        value = p_value;
end
$$
language plpgsql;
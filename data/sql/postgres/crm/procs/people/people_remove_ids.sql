create or replace function people_remove_ids (
    p_people_id crm.people.id%type
)
returns void
as $$
begin
    delete from crm.people_ids
    where people_id = p_people_id;
end
$$
language plpgsql;
create or replace function employee_save (
    p_client_id clients.clients.id%type,
    p_member_id hr.employees.id%type,
    p_first crm.people.first_name%type,
    p_middle crm.people.middle_name%type,
    p_last crm.people.last_name%type,
    p_prefix crm.people.prefix%type,
    p_suffix crm.people.suffix%type
)
returns void
as $$
begin
    -- insert record into crm.people
    perform
        *
    from crm.people_save(
        p_client_id,
        p_member_id,
        p_first,
        p_middle,
        p_last,
        p_prefix,
        p_suffix
    );

    insert into hr.employees (
        id,
        client_id,
        people_id
    ) values (
        p_member_id,
        p_client_id,
        p_member_id
    )
    on conflict do nothing;
end
$$
language plpgsql;
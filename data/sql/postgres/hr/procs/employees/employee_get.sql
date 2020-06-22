create or replace function employee_get (
    p_client_id clients.clients.id%type,
    p_member_id hr.employees.id%type
)
returns table (
    id hr.employees.id%type,
    first_name crm.people.first_name%type,
    middle_name crm.people.middle_name%type,
    last_name crm.people.last_name%type,
    prefix crm.people.prefix%type,
    suffix crm.people.suffix%type
)
as $$
begin
    return query
    select
        b.id,
        a.first_name,
        a.middle_name,
        a.last_name,
        a.prefix,
        a.suffix
    from crm.people a
        inner join hr.employees b on a.id = b.people_id
    where a.client_id = p_client_id
        and b.id = p_member_id;
end
$$
language plpgsql
stable;
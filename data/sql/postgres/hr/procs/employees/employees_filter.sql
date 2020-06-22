create or replace function employees_filter (
    p_client_id clients.clients.id%type,
    p_filter varchar(100)
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
        and b.client_id = p_client_id
        and (
            a.first_name like p_filter
            or a.middle_name like p_filter
            or a.last_name like p_filter
        );
end
$$
language plpgsql
stable;
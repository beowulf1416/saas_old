create or replace function time_entries_get (
    p_client_id clients.clients.id%type,
    p_employee_id hr.employees.id%type,
    p_start datetime,
    p_end datetime
)
returns table (
    id hr.employee_time_entries.id%type,
    dt_start hr.employee_time_entries.dt_start%type,
    dt_end hr.employee_time_entries.dt_end%type,
    computed_hours hr.employee_time_entries.computed_hours%type
)
as $$
begin
    return query
    select
        a.id,
        a.dt_start,
        a.dt_end,
        a.computed_hours
    from hr.employee_time_entries a
    where a.client_id = p_client_id
        and a.employee_id = p_employee_id;
end
$$
language plpgsql
stable;
create or replace function time_entry_save (
    p_client_id clients.clients.id%type,
    p_employee_id hr.employees.id%type,
    p_entry_id hr.employee_time_entries.id%type,
    p_start hr.employee_time_entries.dt_start%type,
    p_end hr.employee_time_entries.dt_end%type,
    p_hours hr.employee_time_entries.computed_hours%type
)
returns void
as $$
begin
    insert into hr.employee_time_entries (
        id,
        client_id,
        employee_id,
        dt_start,
        dt_end,
        computed_hours
    ) values (
        p_entry_id,
        p_client_id,
        p_employee_id,
        p_start,
        p_end,
        (extract(epoch from p_end) - extract(epoch from p_start))/3600
    )
    on conflict (id) do nothing;
end
$$
language plpgsql;
create or replace function shift_save (
    p_client_id clients.clients.id%type,
    p_shift_id hr.shifts.id%type,
    p_name hr.shifts.name%type,
    p_start hr.shifts.start_time%type,
    p_end hr.shifts.end_time%type
)
returns void
as $$
begin
    insert into hr.shifts (
        id,
        client_id,
        name,
        start_time,
        end_time
    ) values (
        p_shift_id,
        p_client_id,
        p_name,
        p_start,
        p_end
    )
    on conflict (id) do update set
        name = p_name,
        start_time = p_start,
        end_time = p_end;
end
$$
language plpgsql;
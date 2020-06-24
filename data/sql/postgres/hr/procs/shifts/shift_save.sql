create or replace function shift_save (
    p_client_id clients.clients.id%type,
    p_shift_id hr.shifts.id%type,
    p_name hr.shifts.name%type,
    p_start hr.shifts.start%type,
    p_end hr.shifts.end%type
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
    on conflict do nothing;
end
$$
language plpgsql;
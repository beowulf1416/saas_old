create or replace function shifts_all (
    p_client_id clients.clients.id%type
)
returns table (
    id hr.shifts.id%type,
    active hr.shifts.active%type,
    created hr.shifts.created_ts%type,
    name hr.shifts.name%type,
    start_time hr.shifts.start_time%type,
    end_time hr.shifts.end_time%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.created_ts,
        a.name,
        a.start_time,
        a.end_time
    from hr.shifts a;
end
$$
language plpgsql
stable;
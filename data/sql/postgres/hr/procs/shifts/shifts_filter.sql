create or replace function shifts_filter (
    p_client_id clients.clients.id%type,
    p_filter hr.shifts.name%type
)
returns table (
    id hr.shifts.id%type,
    active hr.shifts.active%type,
    created hr.shifts.created_ts%type,
    client_id clients.clients.id%type,
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
    from hr.shifts a
    where a.name like p_filter;
end
$$
language plpgsql
stable;
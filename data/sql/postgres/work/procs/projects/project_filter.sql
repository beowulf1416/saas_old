create or replace function project_filter (
    p_client_id clients.clients.id%type,
    p_filter work.projects.name%type
)
returns table (
    id work.projects.id%type,
    name work.projects.name%type,
    description work.projects.description%type,
    planned_start work.projects.planned_start_ts%type,
    planned_end work.projects.planned_end_ts%type,
    actual_start work.projects.actual_start_ts%type,
    actual_end work.projects.actual_end_ts%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.description,
        a.planned_start_ts,
        a.planned_end_ts,
        a.actual_start_ts,
        a.actual_end_ts
    from work.projects a
    where a.client_id = p_client_id
        and (
            a.name ilike p_filter
            or a.description ilike p_filter
        );
end
$$
language plpgsql
stable;
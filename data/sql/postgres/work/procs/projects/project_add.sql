create or replace function project_add (
    p_client_id clients.clients.id%type,
    p_project_id work.projects.id%type,
    p_name work.projects.name%type,
    p_description work.projects.description%type,
    p_planned_start work.projects.planned_start_ts%type,
    p_planned_end work.projects.planned_end_ts%type,
    p_actual_start work.projects.actual_start_ts%type,
    p_actual_end work.projects.actual_end_ts%type
)
returns void
as $$
begin
    insert into work.projects (
        client_id,
        id,
        name,
        description,
        planned_start_ts,
        planned_end_ts,
        actual_start_ts,
        actual_end_ts
    ) values (
        p_client_id,
        p_project_id,
        p_name,
        p_description,
        p_planned_start,
        p_planned_end,
        p_actual_start,
        p_actual_end
    );
end
$$
language plpgsql;
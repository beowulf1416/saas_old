create or replace function project_update (
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
    update work.projects set
        name = p_name,
        description = p_description,
        planned_start_ts = p_planned_start,
        planned_end_ts = p_planned_end,
        actual_start_ts = p_actual_start,
        actual_end_ts = p_actual_end
    where client_id = p_client_id
        and id = p_project_id;
end
$$
language plpgsql;
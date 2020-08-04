create or replace function task_update(
    p_client_id clients.clients.id%type,
    p_project_id work.projects.id%type,
    p_task_id work.project_tasks.id%type,
    p_name work.project_tasks.name%type,
    p_description work.project_tasks.description%type
)
returns void
as $$
begin
    update work.project_tasks set
        name = p_name,
        description = p_description
    where client_id = p_client_id
        and project_id = p_project_id
        and id = p_task_id;
end
$$
language plpgsql;
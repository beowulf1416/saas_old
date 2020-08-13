create or replace function task_remove (
    p_client_id clients.clients.id%type,
    p_project_id work.projects.id%type,
    p_task_id work.tasks.id%type
)
returns void
as $$
begin
    delete from work.tasks
    where client_id = p_client_id
        and project_id = p_project_id
        and id = p_task_id;
end
$$
language plpgsql;
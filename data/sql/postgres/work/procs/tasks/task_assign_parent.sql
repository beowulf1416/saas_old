create or replace function task_assign_parent (
    p_client_id clients.clients.id%type,
    p_project_id work.projects.id%type,
    p_task_id work.project_tasks.id%type,
    p_parent_task_id work.project_tasks.id%type
)
returns void
as $$
begin
    insert into work.project_tasks_tree (
        client_id,
        project_id,
        task_id,
        parent_task_id
    ) values (
        p_client_id,
        p_project_id,
        p_task_id,
        p_parent_task_id
    )
    on conflict (client_id, project_id, task_id) do update set
        parent_task_id = p_parent_task_id;
end
$$
language plpgsql;
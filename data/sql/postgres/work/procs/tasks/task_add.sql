create or replace function task_add(
    p_client_id clients.clients.id%type,
    p_project_id work.projects.id%type,
    p_task_id work.project_tasks.id%type,
    p_name work.project_tasks.name%type,
    p_description work.project_tasks.description%type
)
returns void
as $$
begin
    insert into work.project_tasks (
        client_id,
        project_id,
        id,
        name,
        description
    ) values (
        p_client_id,
        p_project_id,
        p_task_id,
        p_name,
        p_description
    );
end
$$
language plpgsql;
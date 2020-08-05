create or replace function task_add(
    p_client_id clients.clients.id%type,
    p_project_id work.projects.id%type,
    p_task_id work.tasks.id%type,
    p_name work.tasks.name%type,
    p_description work.tasks.description%type
)
returns void
as $$
begin
    insert into work.tasks (
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
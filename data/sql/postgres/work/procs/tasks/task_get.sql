create or replace function task_get (
    p_client_id clients.clients.id%type,
    p_project_id work.projects.id%type,
    p_task_id work.project_tasks.id%type
)
returns table (
    task_id work.project_tasks.id%type,
    name work.project_tasks.name%type,
    description work.project_tasks.description%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.description
    from work.project_tasks a
    where a.client_id = p_client_id
        and a.project_id = p_project_id
        and a.id = p_task_id;
end
$$
language plpgsql
stable;
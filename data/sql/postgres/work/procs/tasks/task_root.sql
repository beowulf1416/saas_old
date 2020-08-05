/**
 * retrieve project root tasks
 */
create or replace function task_root (
    p_client_id clients.clients.id%type,
    p_project_id work.projects.id%type
)
returns table (
    task_id work.tasks.id%type,
    name work.tasks.name%type,
    description work.tasks.description%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.description
    from work.tasks a
    where a.client_id = p_client_id
        and a.project_id = p_project_id;
        -- and a.id not in (
        --     select
        --         b.task_id
        --     from work.tasks_tree b
        --     where b.client_id = p_client_id
        --         and b.project_id = p_project_id
        -- );
end
$$
language plpgsql
stable;
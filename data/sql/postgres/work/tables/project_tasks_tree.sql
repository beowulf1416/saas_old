create table if not exists project_tasks_tree (
    client_id uuid not null,
    project_id uuid not null,
    task_id uuid not null,
    parent_task_id uuid not null,
    path public.ltree not null
);
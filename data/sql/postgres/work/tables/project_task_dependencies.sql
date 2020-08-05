create table if not exists project_task_dependencies (
    client_id uuid not null,
    project_id uuid not null,
    task_id uuid not null,
    dependency_id uuid not null,
    constraint pk_project_task_dependencies primary key (client_id, project_id, task_id, dependency_id),
    constraint fk_project_task_dependencies_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_project_task_dependencies_2 foreign key (client_id, project_id, task_id)
        references work.project_tasks (client_id, project_id, id) on delete restrict on update restrict,
    constraint fk_project_task_dependencies_3 foreign key (client_id, project_id, dependency_id)
        references work.project_tasks (client_id, project_id, id) on delete restrict on update restrict,
    constraint chk_project_task_dependencies_1 check (task_id <> dependency_id)
)
create table if not exists project_tasks_tree (
    client_id uuid not null,
    project_id uuid not null,
    task_id uuid not null,
    parent_task_id uuid not null,
    constraint pk_projects_tasks_tree primary key (client_id, project_id, task_id),
    constraint fk_project_tasks_tree_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_project_tasks_tree_2 foreign key (client_id, project_id)
        references work.projects (client_id, id) on delete restrict on update restrict,
    constraint fk_project_tasks_tree_3 foreign key (client_id, project_id, task_id)
        references work.project_tasks (client_id, project_id, id) on delete restrict on update restrict,
    constraint fk_project_tasks_tree_4 foreign key (client_id, project_id, parent_task_id)
        references work.project_tasks (client_id, project_id, id) on delete restrict on update restrict
);
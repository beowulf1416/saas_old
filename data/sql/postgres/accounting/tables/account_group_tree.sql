create table if not exists account_group_tree (
    client_id uuid not null,
    group_id uuid not null,
    parent_group_id uuid,
    path public.ltree not null,
    constraint pk_account_group_tree primary key (client_id, group_id),
    constraint fk_account_group_tree_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_account_group_tree_2 foreign key (group_id)
        references accounting.account_groups (id) on delete restrict on update restrict,
    constraint fk_account_group_tree_3 foreign key (parent_group_id)
        references accounting.account_groups (id) on delete restrict on update restrict
);
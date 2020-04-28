/**
 * item and groups mapping
 */
create table if not exists item_groups (
    client_id uuid not null,
    item_id uuid not null,
    group_id uuid not null,
    constraint pk_item_groups primary key (client_id, item_id, group_id),
    constraint fk_item_groups_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_groups_2 foreign key (item_id)
        references items (id) on delete restrict on update restrict,
    constraint fk_item_groups_3 foreign key (group_id)
        references groups (id) on delete restrict on update restrict,
);
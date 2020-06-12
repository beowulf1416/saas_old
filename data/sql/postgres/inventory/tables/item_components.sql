create table if not exists item_components (
    client_id uuid not null,
    item_id uuid not null,
    component_item_id uuid not null,
    quantity decimal(12,6) not null,
    dimension_id int not null,
    unit_id int not null,
    constraint pk_item_components primary key (client_id, item_id, component_item_id),
    constraint fk_item_components_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_components_2 foreign key (item_id)
        references inventory.items (id) on delete restrict on update restrict,
    constraint fk_item_components_3 foreign key (component_item_id)
        references inventory.items (id) on delete restrict on update restrict,
    constraint fk_item_components_4 foreign key (dimension_id)
        references common.dimensions (id) on delete restrict on update restrict,
    constraint chk_item_substitutes_1 check (quantity > 0)
);
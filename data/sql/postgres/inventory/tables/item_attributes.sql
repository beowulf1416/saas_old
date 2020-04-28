/**
 * item and attributes mapping
 */
create table if not exists item_attributes (
    client_id uuid not null,
    item_id uuid not null,
    attribute_id uuid not null,
    value varchar(100) not null,
    constraint pk_item_attributes (client_id, item_id, attribute_id),
    constraint fk_item_attributes_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_attributes_2 foreign key (item_id)
        references items (id) on delete restrict on update restrict,
    constraint fk_item_attributes_3 foreign key (attribute_id)
        references attributes (id) on delete restrict on update restrict
);
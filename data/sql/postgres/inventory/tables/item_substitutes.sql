/**
 * item substitutes
 */
create table if not exists item_substitutes (
    client_id uuid not null,
    item_id uuid not null,
    substitute_item_id uuid not null,
    constraint pk_item_substitutes primary key (client_id, item_id, substitute_item_id),
    constraint fk_item_substitutes_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_substitutes_2 foreign key (item_id)
        references items (id) on delete restrict on update restrict,
    constraint fk_item_substitutes_3 foreign key (substitute_item_id)
        references items (id) on delete restrict on update restrict
);
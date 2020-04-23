/**
 * item and category mapping
 */
create table if not exists item_categories (
    client_id uuid not null,
    item_id uuid not null,
    category_id uuid not null,
    constraint p_item_categories primary key (client_id, item_id, category_id),
    constraint fk_item_categories_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_categories_2 foreign key (item_id)
        references items (id) on delete restrict on update restrict,
    constraint fk_item_categories_3 foreign key (category_id)
        references categories (id) on delete restrict on update restrict
);
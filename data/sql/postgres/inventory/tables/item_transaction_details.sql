/**
 * item transaction details
 */
create table if not exists item_transaction_details (
    id uuid not null default public.gen_random_uuid(),
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    created_year smallint not null,
    client_id uuid not null,
    meta_id uuid not null,
    item_id uuid not null,
    uom_id uuid not null,
    quantity numeric(12,6) not null,
    constraint fk_item_tran_details_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_tran_details_2 foreign key (created_year, meta_id)
        references item_transaction_meta (created_year, id) on delete restrict on update restrict,
    constraint fk_item_tran_details_3 foreign key (item_id)
        references items (id) on delete restrict on update restrict,
    constraint fk_item_tran_details_4 foreign key (uom_id)
        references item_uom (id) on delete restrict on update restrict,
    constraint chk_item_tran_details_5 check (quantity > 0)
)
partition by range (created_year);
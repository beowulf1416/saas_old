/**
 * item transactions metadata
 */
create table if not exists item_transaction_meta (
    id uuid not null default public.gen_random_uuid(),
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    created_year smallint not null,
    client_id uuid not null,
    type_id smallint not null,
    constraint p_item_tran_meta primary key (created_year, id),
    constraint fk_item_tran_meta_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_tran_meta_2 foreign key (type_id)
        references item_transaction_types (id) on delete restrict on update restrict
)
partition by range (created_year);
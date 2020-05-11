/**
 * item transactions metadata
 */
create table if not exists item_transaction_meta (
    id uuid not null default public.gen_random_uuid(),
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    type_id smallint not null,
    constraint pk_item_tran_meta primary key (id),
    constraint fk_item_tran_meta_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_tran_meta_2 foreign key (type_id)
        references item_transaction_meta (id) on delete restrict on update restrict
)
partition by range (extract (year from created_ts));
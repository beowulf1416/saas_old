create table if not exists transaction_items (
    id uuid not null,
    transaction_id uuid not null,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    account_id uuid not null,
    debit decimal(12,4),
    credit decimal(12,4),
    constraint pk_transaction_items primary key (id),
    constraint fk_transaction_items_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_transaction_items_2 foreign key (transaction_id)
        references accounting.transactions (id) on delete restrict on update restrict,
    constraint chk_transaction_items_1 check (debit <> credit),
    constraint chk_transaction_items_2 check (debit > 0 and (credit is null or credit = 0)),
    constraint chk_transaction_items_3 check (credit > 0 and (debit is null or debit = 0))
);
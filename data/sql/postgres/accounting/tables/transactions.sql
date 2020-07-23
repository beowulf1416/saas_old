create table if not exists transactions (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    created_year smallint not null default extract(year from now()),
    posted_ts timestamp without time zone,
    client_id uuid not null,
    currency_id int not null,
    description text not null,
    constraint pk_transactions primary key (created_year, client_id, id),
    constraint fk_transactions_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_transactions_2 foreign key (currency_id)
        references common.currencies (id) on delete restrict on update restrict
)
partition by range (created_year);

-- default partition
create table if not exists transactions_default
partition of transactions default;
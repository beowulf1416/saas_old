create table if not exists transaction_attachments (
    id uuid not null,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    created_year smallint not null default extract(year from now()),
    client_id uuid not null,
    transaction_id uuid not null,
    filename varchar(200) not null,
    filetype varchar(100) not null,
    filesize int not null,
    data text not null,
    constraint pk_transaction_attachments primary key (created_year, client_id, id),
    constraint fk_transaction_attachments_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_transaction_attachments_2 foreign key (created_year, client_id, transaction_id)
        references accounting.transactions (created_year, client_id, id) on delete restrict on update restrict
)
partition by range (created_year);

-- default partition
create table if not exists transaction_attachments_default
partition of transaction_attachments default;
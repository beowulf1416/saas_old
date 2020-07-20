create table if not exists transactions (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    posted_ts timestamp without time zone,
    client_id uuid not null,
    particulars text not null,
    constraint pk_transactions primary key (id),
    constraint fk_transactions foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);
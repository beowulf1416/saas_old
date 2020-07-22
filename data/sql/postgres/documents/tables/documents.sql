create table if not exists documents (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    created_year int not null default(extract(year from now())),
    client_id uuid not null,
    filename varchar(200) not null,
    content_type varchar(100) not null,
    data oid not null,
    constraint pk_documents primary key (created_year, client_id, id),
    constraint fk_documents_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
)
partition by range (created_year);

-- default partition
create table if not exists documents_default
partition of documents default;
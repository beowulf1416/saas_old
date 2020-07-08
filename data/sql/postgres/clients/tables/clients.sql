/**
 * client management
 */
create table if not exists clients (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    name varchar(200) not null,
    address text,
    country_id int not null,
    constraint pk_clients primary key (id),
    constraint u_clients_1 unique (name),
    constraint fk_clients_2 foreign key (country_id)
        references common.countries (iso_3166_1_numeric) on delete restrict on update restrict,
    constraint chk_clients_1 check (name <> '')
);
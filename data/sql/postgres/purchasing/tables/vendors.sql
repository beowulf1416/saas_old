create table if not exists vendors (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    org_id uuid not null,
    constraint pk_vendors primary key (id),
    constraint u_vendors_1 unique (org_id),
    constraint fk_vendors_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_vendors_2 foreign key (org_id)
        references crm.organizations (id) on delete restrict on update restrict
);
create table if not exists org_people (
    client_id uuid not null,
    org_id uuid not null,
    people_id uuid not null,
    constraint pk_org_people primary key (client_id, org_id, people_id),
    constraint fk_org_people_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_org_people_2 foreign key (org_id)
        references crm.organizations (id) on delete restrict on update restrict,
    constraint fk_org_people_3 foreign key (people_id)
        references crm.people (id) on delete restrict on update restrict
)
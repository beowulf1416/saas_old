create table if not exists tag_organizations (
    client_id uuid not null,
    organization_id uuid not null,
    tag_id uuid not null,
    constraint pk_tag_organizations primary key (client_id, organization_id, tag_id),
    constraint fk_tag_organizations_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_tag_organizations_2 foreign key (organization_id)
        references crm.organizations (id) on delete restrict on update restrict,
    constraint fk_tag_organizations_3 foreign key (tag_id)
        references crm.tags (id) on delete restrict on update restrict
);
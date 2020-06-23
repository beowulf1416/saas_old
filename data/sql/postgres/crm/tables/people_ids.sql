create table if not exists people_ids (
    people_id uuid not null,
    id_type int not null,
    value varchar(30) not null,
    constraint pk_people_ids primary key (people_id, id_type),
    constraint fk_people_ids_1 foreign key (people_id)
        references crm.people (id) on delete restrict on update restrict,
    constraint fk_people_ids_2 foreign key (id_type)
        references crm.id_types (id) on delete restrict on update restrict
);
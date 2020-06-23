create table if not exists genders (
    id int not null,
    name varchar(30) not null,
    constraint pk_gender primary key (id),
    constraint u_gender_1 unique (name)
);
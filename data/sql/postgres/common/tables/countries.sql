create table if not exists countries (
    id int not null,
    name varchar(100) not null,
    code varchar(5) not null,
    constraint pk_countries primary key (id),
    constraint u_countries unique (name)
);
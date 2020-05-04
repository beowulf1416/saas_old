/**
 * dimensions table
 */
create table if not exists dimensions (
    id smallint not null,
    name varchar(20) not null,
    constraint pk_dimensions primary key (id),
    constraint u_dimensions_1 unique (name)
);

insert into dimensions (id, name) values 
(1, 'length'),
(2, 'area'),
(3, 'volume'),
(4, 'weight'),
(5, 'quantity')
on conflict do nothing;
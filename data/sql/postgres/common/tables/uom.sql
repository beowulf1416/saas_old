/**
 * units of measure
 */
create table if not exists uom (
    id bigint not null,
    dimension_id smallint not null,
    name varchar(30) not null,
    symbol varchar(5)
);
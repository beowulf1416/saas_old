create table if not exists countries (
    id int not null,
    name varchar(100) not null,
    code varchar(5) not null,
    constraint pk_countries primary key (id),
    constraint u_countries unique (name)
);

do $$
begin
    -- https://www.postgresql.org/docs/9.2/sql-copy.html
    copy countries 
    from '../csv/countries.csv'
    option 
        format csv
        header true;
end
$$
language plpgsql;
/**
 * account types
 */
create table if not exists account_types (
    id smallint not null,
    name varchar(20) not null,
    constraint pk_account_types primary key (id),
    constraint u_accounts_types_1 unique (name)
);

insert into account_types (id, name) values 
(0, 'root'),
(1,'assets'),
(2,'liabilities'),
(3,'equity'),
(4,'income'),
(5,'expense')
on conflict do nothing;
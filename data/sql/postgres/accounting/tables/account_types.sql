/**
 * account types
 */
create table if not exists account_types (
    id smallint not null,
    name varchar(20) not null,
    constraint pk_account_types primary key (id),
    constraint u_accounts_types_1 unique (name)
);
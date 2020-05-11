/**
 * transaction types
 */
create table if not exists item_transaction_types (
    id smallint not null,
    name varchar(100) not null,
    constraint pk_item_tran_types primary key (id),
    constraint u_item_tran_types_1 unique (name)
);

insert into item_transaction_types (id, name) values 
(1, 'receive'),
(2, 'return'),
(3, 'transfer'),
(4, 'adjustment')
on conflict do nothing;
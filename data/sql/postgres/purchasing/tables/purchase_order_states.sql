create table if not exists purchase_order_states (
    id int not null,
    name varchar(100) not null,
    constraint pk_purchase_order_states primary key (id),
    constraint u_purchase_order_states_1 unique (name)
);
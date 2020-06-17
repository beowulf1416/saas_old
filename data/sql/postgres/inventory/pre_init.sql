/**
 * initialize inventory schema
 */


insert into inventory.item_transaction_types (id, name) values 
(1, 'receive'),
(2, 'return'),
(3, 'transfer'),
(4, 'adjustment')
on conflict do nothing;
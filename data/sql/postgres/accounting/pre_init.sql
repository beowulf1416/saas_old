/**
 * initialize accounting schema
 */

 insert into accounting.account_types (id, name) values 
(0, 'root'),
(1,'asset'),
(2,'liability'),
(3,'equity'),
(4,'income'),
(5,'expense')
on conflict do nothing;
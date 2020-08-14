/**
 * initialize purchasing schema
 */
insert into purchasing.purchase_order_states (id,name) values 
(1,'new'),
(2,'cancelled'),
(3,'approved'),
(4,'purchased'),
(5,'received');
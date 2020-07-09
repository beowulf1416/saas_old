set schema 'purchasing';

\ir procs/vendors/vendor_add.sql
\ir procs/vendors/vendor_update.sql
\ir procs/vendors/vendors_filter.sql
\ir procs/vendors/vendor_get.sql
\ir procs/vendors/vendor_assign_org.sql

\ir procs/purchase_orders/purchase_order_save.sql
\ir procs/purchase_orders/purchase_orders_filter.sql
\ir procs/purchase_orders/purchase_order_get.sql

\ir procs/purchase_orders/purchase_order_item_add.sql
\ir procs/purchase_orders/purchase_order_item_update.sql
\ir procs/purchase_orders/purchase_order_item_remove.sql
\ir procs/purchase_orders/purchase_order_items_get.sql


set schema 'public';
/**
 * purchasing management
 */
\echo '** PURCHASING **'
create schema if not exists purchasing;
set schema 'purchasing';

\ir tables/vendors.sql

\ir tables/purchase_order_states.sql
\ir tables/purchase_orders.sql
\ir tables/purchase_order_items.sql


set schema 'public';
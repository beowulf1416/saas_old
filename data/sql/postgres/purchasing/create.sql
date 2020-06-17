/**
 * purchasing management
 */
create schema if not exists purchasing;
set schema 'purchasing';

\echo '** PURCHASING **'

\ir tables/purchase_orders.sql
\ir tables/purchase_order_items.sql


set schema 'public';
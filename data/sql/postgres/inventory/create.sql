/**
 * inventory management
 */
create schema if not exists inventory;
set schema 'inventory';

/** tables **/
\ir tables/items.sql
\ir tables/item_substitutes.sql


/** functions **/


set schema 'public';
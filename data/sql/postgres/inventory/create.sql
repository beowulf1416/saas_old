/**
 * inventory management
 */
create schema if not exists inventory;
set schema 'inventory';

/** tables **/
\ir tables/items.sql


/** functions **/


set schema 'public';
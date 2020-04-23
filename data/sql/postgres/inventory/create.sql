/**
 * inventory management
 */
create schema if not exists inventory;
set schema 'inventory';

/** tables **/
\ir tables/categories.sql

\ir tables/items.sql
\ir tables/item_substitutes.sql
\ir tables/item_categories.sql


/** functions **/


set schema 'public';
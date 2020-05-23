/**
 * inventory management
 */
create schema if not exists inventory;
set schema 'inventory';


/** tables **/
\ir tables/warehouses.sql
\ir tables/locations.sql

\ir tables/categories.sql
\ir tables/groups.sql
\ir tables/attributes.sql
\ir tables/vendors.sql

\ir tables/items.sql
\ir tables/item_substitutes.sql
\ir tables/item_categories.sql
\ir tables/item_uom.sql
\ir tables/item_locations.sql

\ir tables/item_transaction_types.sql
\ir tables/item_transaction_meta.sql
\ir tables/item_transaction_details.sql

\ir tables/item_vendors.sql



set schema 'public';
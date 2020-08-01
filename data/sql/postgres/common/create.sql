/**
 * common schema
 */
\echo '** COMMON **'
create schema if not exists common;
set schema 'common';


/** tables **/
\ir tables/dimensions.sql
\ir tables/countries.sql
\ir tables/currencies.sql

\ir tables/uom.sql
\ir tables/uom_length.sql
\ir tables/uom_area.sql
\ir tables/uom_volume.sql
\ir tables/uom_weight.sql
\ir tables/uom_quantity.sql



set schema 'public';
create schema if not exists common;
set schema 'common';


/** tables **/
\ir tables/dimensions.sql
\ir tables/countries.sql
\ir tables/currencies.sql


/** functions **/



set schema 'public';
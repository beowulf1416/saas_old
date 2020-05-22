create schema if not exists common;
set schema 'common';


/** tables **/
\ir tables/dimensions.sql
\ir tables/countries.sql
\ir tables/currencies.sql
\ir tables/uom.sql

-- https://www.postgresql.org/docs/12/app-psql.html
\copy common.countries (id, name) \
from '../csv/countries.csv' 
with option \
format csv \
header true \
quote '"'


\copy common.currencies (id, name) \
from '../csv/currencies.csv' \
with option \
format csv \
header \
quote '"'



set schema 'public';
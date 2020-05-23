create schema if not exists common;
set schema 'common';


/** tables **/
\ir tables/dimensions.sql
\ir tables/countries.sql
\ir tables/currencies.sql
\ir tables/uom.sql

-- https://www.postgresql.org/docs/12/app-psql.html
\copy common.countries (name,iso_3166_1_alpha_2,iso_3166_1_alpha_3,iso_3166_1_numeric,iso_4217_currency_alpha,iso_4217_currency_country_name,iso_4217_currency_minor_unit,iso_4217_currency_name,iso_4217_currency_numeric) from '../../csv/countries.csv' with delimiter ',' csv header quote '"'

\copy common.currencies (id, name) \
from '../csv/currencies.csv' \
with option \
format csv \
header \
quote '"'



set schema 'public';
/**
 * initialize common schema
 */

-- https://www.postgresql.org/docs/12/app-psql.html
-- countries
\copy common.countries (name,iso_3166_1_alpha_2,iso_3166_1_alpha_3,iso_3166_1_numeric,iso_4217_currency_alpha,iso_4217_currency_country_name,iso_4217_currency_minor_unit,iso_4217_currency_name,iso_4217_currency_numeric) from '../../csv/countries.csv' with delimiter ',' csv header quote '"'

-- currencies
\copy common.currencies (currency, name, symbol) from '../../csv/currencies.csv' with delimiter ',' csv header quote '"'; 

-- dimensions
insert into common.dimensions (id, name) values 
(1, 'length'),
(2, 'area'),
(3, 'volume'),
(4, 'weight'),
(5, 'quantity')
on conflict do nothing;

-- units of measure
\copy common.uom_length (id, name, symbol) from '../../csv/uom_length.csv' with delimiter ',' csv header quote '"';
\copy common.uom_area (id, name, symbol) from '../../csv/uom_area.csv' with delimiter ',' csv header quote '"';
\copy common.uom_volume (id, name, symbol) from '../../csv/uom_volume.csv' with delimiter ',' csv header quote '"';
\copy common.uom_weight (id, name, symbol) from '../../csv/uom_weight.csv' with delimiter ',' csv header quote '"';
\copy common.uom_quantity (id, name, symbol) from '../../csv/uom_quantity.csv' with delimiter ',' csv header quote '"';

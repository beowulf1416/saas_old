create or replace function countries_filter (
    p_filter common.countries.iso_4217_currency_country_name%type
)
returns table (
    name varchar(100),
    iso_3166_1_alpha_2 varchar(5),
    iso_3166_1_alpha_3 varchar(5),
    iso_3166_1_numeric int,
    iso_4217_currency_alpha varchar(10),
    iso_4217_currency_country_name varchar(100),
    iso_4217_currency_minor_unit varchar(100),
    iso_4217_currency_name varchar(100),
    iso_4217_currency_numeric int
)
as $$
begin
    return query
    select
        a.name,
        a.iso_3166_1_alpha_2,
        a.iso_3166_1_alpha_3,
        a.iso_3166_1_numeric,
        a.iso_4217_currency_alpha,
        a.iso_4217_currency_country_name,
        a.iso_4217_currency_minor_unit,
        a.iso_4217_currency_name,
        a.iso_4217_currency_numeric
    from common.countries a
    where a.name ilike p_filter;
end
$$
language plpgsql
stable;
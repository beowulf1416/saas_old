create or replace function countries_get (
    p_country_id common.countries.iso_3166_1_numeric%type
)
returns table (
    name common.countries.name%type,
    iso_3166_1_alpha_2 common.countries.iso_3166_1_alpha_2%type,
    iso_3166_1_alpha_3 common.countries.iso_3166_1_alpha_3%type,
    iso_3166_1_numeric common.countries.iso_3166_1_numeric%type,
    iso_4217_currency_alpha common.countries.iso_4217_currency_alpha%type,
    iso_4217_currency_country_name common.countries.iso_4217_currency_country_name%type,
    iso_4217_currency_minor_unit common.countries.iso_4217_currency_minor_unit%type,
    iso_4217_currency_name common.countries.iso_4217_currency_name%type,
    iso_4217_currency_numeric common.countries.iso_4217_currency_numeric%type
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
    where a.iso_3166_1_numeric = p_country_id;
end
$$
language plpgsql
stable;
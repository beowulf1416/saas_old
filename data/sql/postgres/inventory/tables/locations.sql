/**
 * locations table
 */
create table if not exists locations (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    warehouse_id uuid not null,
    floor_id varchar(100),
    shelf_id varchar(100),
    level_id varchar(100),
    bin_id varchar(100)
);
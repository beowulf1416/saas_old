/**
 * create application user
 * run as user with superuser privilege
 */
create role saas_app_usr login password 'saas_app_pw';

grant select, insert, update, delete on all tables in schema iam to saas_app_usr;
grant all privileges on database saas to saas_app_usr;

/** clients **/
grant all privileges on all tables in schema clients to saas_app_usr;
grant usage on schema clients to saas_app_usr;
grant execute on all functions in schema clients to saas_app_usr;

/** iam **/
grant all privileges on all tables in schema iam to saas_app_usr;
grant usage on schema iam to saas_app_usr;
grant execute on all functions in schema iam to saas_app_usr;

/** accounting **/
grant all privileges on all tables in schema accounting to saas_app_usr;
grant usage on schema accounting to saas_app_usr;
grant execute on all functions in schema accounting to saas_app_usr;

/** inventory **/
grant all privileges on all tables in schema inventory to saas_app_usr;
grant usage on schema inventory to saas_app_usr;
grant execute on all functions in schema inventory to saas_app_usr;

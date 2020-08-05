/**
 * work management
 */
\echo '** WORK **'

create schema if not exists work;
set schema 'work';

/** tables **/
\ir tables/projects.sql
\ir tables/tasks.sql
\ir tables/task_dependencies.sql



set schema 'work';
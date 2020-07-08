/**
 * work management
 */
\echo '** WORK **'

create schema if not exists work;
set schema 'work';

/** tables **/
\ir tables/projects.sql
\ir tables/project_tasks.sql
\ir tables/project_tasks_tree.sql


/** functions **/



set schema 'work';
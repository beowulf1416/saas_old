/**
 * work management
 */
set schema 'work';


/** functions **/
-- projects
\ir procs/projects/project_add.sql
\ir procs/projects/project_update.sql
\ir procs/projects/project_get.sql
\ir procs/projects/project_filter.sql

-- tasks
\ir procs/tasks/task_add.sql
\ir procs/tasks/task_update.sql
\ir procs/tasks/task_remove.sql
\ir procs/tasks/task_get.sql
\ir procs/tasks/task_root.sql

set schema 'work';
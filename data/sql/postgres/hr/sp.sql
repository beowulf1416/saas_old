/**
 * human resource management
 */
set schema 'hr';

/** functions **/
\ir procs/employees/employee_save.sql
\ir procs/employees/employees_filter.sql
\ir procs/employees/employee_get.sql

\ir procs/shifts/shift_save.sql
\ir procs/shifts/shifts_all.sql


set schema 'public';
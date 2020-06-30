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
\ir procs/shifts/shifts_filter.sql

\ir procs/time_entries/time_entry_save.sql
\ir procs/time_entries/time_entries_get.sql

set schema 'public';
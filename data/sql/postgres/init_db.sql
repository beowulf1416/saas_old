/**
 * initialize database
 */

set schema 'public';

\ir common/init.sql
\ir clients/init.sql
\ir iam/init.sql
\ir accounting/init.sql
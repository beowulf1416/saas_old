/**
 * employee and user mapping table
 */
create table if not exists employee_user (
    client_id uuid not null,
    user_id uuid not null,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    constraint pk_employee_user primary key (client_id, user_id),
    constraint fk_employee_user_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_employee_user_2 foreign key (user_id)
        references iam.users (id) on delete restrict on update restrict
);
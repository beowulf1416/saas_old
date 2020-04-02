/**
 * user accounts linked to google
 */
create table if not exists users_google (
    id UUID not null,
    google_id bigint not null,
    constraint pk_users_google primary key (id),
    constraint fk_users_google_1 foreign key (id) references iam.users(id)
        on delete restrict on update restrict
);
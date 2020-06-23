/**
 * customer relations management
 */
set schema 'crm';

insert into crm.genders (id, name) values 
(0, 'male'),
(1, 'female');

set schema 'public';
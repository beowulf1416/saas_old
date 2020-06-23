/**
 * customer relations management
 */
set schema 'crm';

insert into crm.id_types (id, name) values 
(1, 'SSS'),
(2, 'Driver''s License'),
(3, 'TIN'),
(4, 'GSIS');

insert into crm.genders (id, name) values 
(0, 'male'),
(1, 'female');

set schema 'public';
/**
 * initialize iam schema
 */

-- permissions
insert into iam.permissions (name) values
('user.authenticated'),
('admin.dashboard'),
('admin.clients'),
('admin.security.permissions'),
('admin.security.roles'),
('admin.security.users'),
('client.info'),
('clients.filter'),
('clients.dashboard'),
('clients.admin'),
('clients.admin.activate'),
('clients.admin.users'),
('clients.admin.roles'),
('accounting.dashboard'),
('accounting.admin'),
('inventory.admin'),
('inventory.dashboard'),
('inventory.items'),
('inventory.transactions.receiving'),
('inventory.transactions.receiving.add'),
('hr.dashboard'),
('purchasing.dashboard'),
('purchasing.orders.dashboard.view'),
('purchasing.orders.create'),
('purchasing.orders.approve'),
('purchasing.orders.receive'),
('project.dashboard'),
('crm.dashboard')
on conflict do nothing;
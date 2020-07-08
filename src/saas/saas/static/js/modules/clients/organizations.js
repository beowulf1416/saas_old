'use strict';
import { Util } from '/static/js/util.js';
class ClientOrganizations {

    static assignParentOrganization(clientId = '', organizationId = '', parentOrganizationId = '') {
        return Util.fetch('/api/clients/organizations/parent/assign', {
            clientId: clientId,
            organizationId: organizationId,
            parentOrganizationId: parentOrganizationId
        });
    }

    static tree(clientId = '') {
        return Util.fetch('/api/clients/organizations/tree', {
            clientId: clientId
        });
    }

    static add(clientId = '', organizationId = '', name = '', description = '') {
        return Util.fetch('/api/clients/organizations/add', {
            clientId: clientId,
            organizationId: organizationId,
            name: name,
            description: description
        });
    }

    static update(clientId = '', organizationId = '', name = '', description = '') {
        return Util.fetch('/api/clients/organizations/update', {
            clientId: clientId,
            organizationId: organizationId,
            name: name,
            description: description
        });
    }
}
export { ClientOrganizations };
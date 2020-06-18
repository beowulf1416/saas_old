'use strict';

class ClientOrganizations {

    static assignParentOrganization(clientId = '', organizationId = '', parentOrganizationId = '') {
        return fetch('/api/clients/organizations/parent/assign', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                organizationId: organizationId,
                parentOrganizationId: parentOrganizationId
            })
        })
        .then((r) => r.json());
    }

    static tree(clientId = '') {
        return fetch('/api/clients/organizations/tree', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId
            })
        })
        .then((r) => r.json());
    }
}
export { ClientOrganizations };
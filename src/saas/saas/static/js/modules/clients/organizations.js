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

    static add(clientId = '', name = '', description = '') {
        return fetch('/api/clients/organizations/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                name: name,
                description: description
            })
        })
        .then((r) => r.json());
    }

    static update(clientId = '', organizationId = '', name = '', description = '') {
        return fetch('/api/clients/organizations/update', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                organizationId: organizationId,
                name: name,
                description: description
            })
        })
        .then((r) => r.json());
    }
}
export { ClientOrganizations };
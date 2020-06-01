'use strict';

class Organizations {
    static add(name, description) {
        return fetch('/api/clients/organizations/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        })
        .then((r) => r.json());
    }

    static tree() {
        return fetch('/api/clients/organizations/tree', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((r) => r.json());
    }

    static assignParentOrganization(organizationId, parentOrganizationId) {
        return fetch('/api/clients/organizations/parent/assign', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                organizationId: organizationId,
                parentOrganizationId: parentOrganizationId
            })
        })
        .then((r) => r.json());
    }
}
export { Organizations }
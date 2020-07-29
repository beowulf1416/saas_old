'use strict';
import { Util } from '/static/js/util.js';
class Accounts {
    static getAccountTypes() {
        return Util.fetch('/api/accounting/accounts/types', {});
    }

    static add(clientId = '', accountId = '', typeId = '', name = '', description = '', parentAccountId = '') {
        return Util.fetch('/api/accounting/accounts/add', {
            clientId: clientId,
            accountId: accountId,
            typeId: typeId,
            name: name,
            description: description
        });
    }

    static getTree(clientId) {
        return Util.fetch('/api/accounting/accounts/tree', {
            clientId: clientId
        });
    }

    static chart(clientId = '') {
        return Util.fetch('/api/accounting/accounts/chart', {
            clientId: clientId
        });
    }

    static assignParent(clientId, accountId, parentAccountId) {
        return Util.fetch('/api/accounting/accounts/parent/assign', {
            clientId: clientId,
            accountId: accountId,
            parentAccountId: parentAccountId
        });
    }

    static filter(clientId = '', filter = '') {
        return Util.fetch('/api/accounting/accounts/filter', {
            clientId: clientId,
            filter: filter
        })
    }

    static get(clientId = '', accountId = '') {
        return Util.fetch('/api/accounting/accounts/get', {
            clientId: clientId,
            accountId: accountId
        });
    }

    static assignGroup(clientId = '', accountId = '', groupId = '') {
        return Util.fetch('/api/accounting/accounts/assign/group', {
            clientId: clientId,
            accountId: accountId,
            groupId: groupId
        });
    }
}
export { Accounts };
'use strict';
import { Util } from '/static/js/util.js';
class Groups {

    static add(clientId = '', groupId = '', typeId = '', name = '', description = '') {
        return Util.fetch('/api/accounting/groups/add', {
            clientId: clientId,
            groupId: groupId,
            typeId: typeId,
            name: name,
            description: description
        })
    }

    static update(clientId = '', groupId = '', typeId = '', name = '', description = '') {
        return Util.fetch('/api/accounting/groups/update', {
            clientId: clientId,
            groupId: groupId,
            typeId: typeId,
            name: name,
            description: description
        });
    }

    static tree(clientId = '') {
        return Util.fetch('/api/accounting/groups/tree', {
            clientId: clientId
        });
    }

    static assignParentGroup(clientId = '', groupId = '', parentGroupId = '') {
        return Util.fetch('/api/accounting/groups/assign', {
            clientId: clientId,
            groupId: groupId,
            parentGroupId: parentGroupId
        });
    }
}
export { Groups };
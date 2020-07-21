'use strict';
import { Util } from '/static/js/util.js';
class Groups {

    static add(clientId = '', groupId = '', name = '', description = '') {
        return Util.fetch('/api/accounting/groups/add', {
            clientId: clientId,
            groupId: groupId,
            name: name,
            description: description
        })
    }
}
export { Groups };
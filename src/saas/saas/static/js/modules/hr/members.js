'use strict';
import { Util } from '/static/js/util.js';
class Members {

    static save(member = {}) {
        return Util.fetch('/api/hr/members/save', member);
    }

    static filter(clientId = '', filter = '') {
        return Util.fetch('/api/hr/members/filter', {
            clientId: clientId,
            filter: filter
        });
    }

    static get(clientId = '', memberId = '') {
        return Util.fetch('/api/hr/members/get', {
            clientId: clientId,
            memberId: memberId
        });
    }
}
export { Members };
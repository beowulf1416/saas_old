'use strict';
import { Util } from '/static/js/util.js';
class TimeEntries {

    static save(clientId = '', memberId = '', entries = []) {
        return Util.fetch('/api/hr/time/entries/save', {
            clientId: clientId,
            memberId: memberId,
            entries: entries
        });
    }
}
export { TimeEntries };
'use strict';
import { Util } from '/static/js/util.js';
class Shifts {

    static save(clientId = '', shiftId = '', name = '', start = '', end = '') {
        return Util.fetch('/api/hr/shifts/save', { 
            clientId: clientId,
            shiftId: shiftId,
            name: name,
            start: start,
            end: end
        });
    }

    static all(clientId = '') {
        return Util.fetch('/api/hr/shifts/all', {
            clientId: clientId
        });
    }
}
export { Shifts };
'use strict';
import { Util } from '/static/js/util.js';
class MaterialReceiving {

    static save(receipt = {}) {
        return Util.fetch('/api/inventory/receiving/save', receipt);
    }

    static filter(clientId = '', filter = '') {
        return Util.fetch('/api/inventory/receiving/filter', {
            clientId: clientId,
            filter: filter
        });
    }
}
exports { MaterialReceiving };
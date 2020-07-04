'use strict';
import { Util } from '/static/js/util.js';
class Clients {

    static get(client_id = '') {
        return Util.fetch('/api/client/get', {
            clientId: client_id
        });
    }
}
export { Clients };
'use strict';
import { Util } from '/static/js/util.js';
class IdTypes {
    static all() {
        return Util.fetch('/api/hr/id/types');
    }
}
export { IdTypes };
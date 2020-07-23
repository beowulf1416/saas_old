'use strict';
import { Util } from '/static/js/util.js';
class Journal {

    static add(journal = {}) {
        return Util.fetch('/api/accounting/journals/add', journal);
    }
}
export { Journal };
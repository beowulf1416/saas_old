'use strict';
import { Util } from '/static/js/util.js';
class Transaction {

    static add(transaction = {}) {
        return Util.fetch('/api/accounting/transactions/add', transaction);
    }

    static update(transaction = {}) {
        return Util.fetch('/api/accounting/transactions/update', transaction);
    }
}
export { Transaction }
'use strict';
import { Util } from '/static/js/util.js';
class Transaction {

    static add(transaction = {}) {
        return Util.fetch('/api/accounting/transactions/add', transaction);
    }

    static update(transaction = {}) {
        return Util.fetch('/api/accounting/transactions/update', transaction);
    }

    static get(clientId = '', transactionId = '') {
        return Util.fetch('api.accounting.transactions.get', {
            clientId: clientId,
            transactionId: transactionId
        })
    }

    static filter(clientId = '', filter = '') {
        return Util.fetch('/api/accounting/transactions/filter', {
            clientId: clientId,
            filter: filter
        })
    }
}
export { Transaction }
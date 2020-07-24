import unittest

from pyramid import testing


class TestCurrencyStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.common.stores.currencies import CurrencyStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.currencyStore = CurrencyStore(self.mgr, 'default')

    def test_countries_all(self):
        result = self.currencyStore.all()
        self.assertGreater(len(result), 0)

    def test_currencies_filter(self):
        result = self.currencyStore.filter('pes')
        self.assertGreater(len(result), 0, '{0}'.format(result))

    def test_currencies_get(self):
        currency_id = 108 # philippine peso
        result = self.currencyStore.get(currency_id)
        self.assertGreater(len(result), 0, '{0}'.format(result))
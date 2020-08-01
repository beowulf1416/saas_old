import unittest

from pyramid import testing


class TestCountryStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.common.stores.countries import CountryStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.countryStore = CountryStore(self.mgr, 'default')

    def test_countries_all(self):
        result = self.countryStore.all()
        self.assertGreater(len(result), 0)

    def test_countries_filter(self):
        result = self.countryStore.filter('%%')
        self.assertGreater(len(result), 0, '{0}'.format(result))

    def test_countries_get(self):
        result = self.countryStore.get(608) # country id for philippines
        self.assertGreater(len(result), 0, '{0}'.format(result))
import unittest

from pyramid import testing

import string
import random
import uuid

from saas.app.core.stores.base import StoreException


class TestInventoryFacilityStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.inventory.stores.facility import FacilityStore
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.facilityStore = FacilityStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')

        self.defaultClient = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_facility_add(self):
        client_id = self.defaultClient[0]
        facility_id = str(uuid.uuid4())
        random_name = self.generate_random_str(10)
        country_id = self.defaultClient[4]
        uom_id = 1 #

        try:
            self.facilityStore.add(
                client_id,
                facility_id,
                random_name,
                random_name,
                random_name,
                country_id,
                100,
                uom_id
            )
        except Exception as e:
            self.fail(e)

    def test_facility_add_duplicate_name(self):
        client_id = self.defaultClient[0]
        facility_id = str(uuid.uuid4())
        random_name = self.generate_random_str(10)
        country_id = self.defaultClient[4]
        uom_id = 1 #

        self.facilityStore.add(
            client_id,
            facility_id,
            random_name,
            random_name,
            random_name,
            country_id,
            100,
            uom_id
        )
        try:
            facility_id = str(uuid.uuid4())
            self.assertRaises(
                StoreException,
                self.facilityStore.add,
                client_id,
                facility_id,
                random_name,
                random_name,
                random_name,
                country_id,
                100,
                uom_id
            )
        except Exception as e:
            self.fail(e)

    def test_facility_update(self):
        client_id = self.defaultClient[0]
        facility_id = str(uuid.uuid4())
        random_name = self.generate_random_str(10)
        country_id = self.defaultClient[4]
        uom_id = 1 #

        self.facilityStore.add(
            client_id,
            facility_id,
            random_name,
            random_name,
            random_name,
            country_id,
            100,
            uom_id
        )
        try:
            random_name = self.generate_random_str(10)
            self.facilityStore.update(
                client_id,
                facility_id,
                random_name,
                random_name,
                random_name,
                country_id,
                100,
                uom_id
            )
        except Exception as e:
            self.fail(e)

    def test_facility_filter(self):
        client_id = self.defaultClient[0]
        facility_id = str(uuid.uuid4())
        random_name = self.generate_random_str(10)
        country_id = self.defaultClient[4]
        uom_id = 1 #

        self.facilityStore.add(
            client_id,
            facility_id,
            random_name,
            random_name,
            random_name,
            country_id,
            100,
            uom_id
        )
        try:
            result = self.facilityStore.filter(client_id, random_name[1:9])
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)

    def test_facility_get(self):
        client_id = self.defaultClient[0]
        facility_id = str(uuid.uuid4())
        random_name = self.generate_random_str(10)
        country_id = self.defaultClient[4]
        uom_id = 1 #

        self.facilityStore.add(
            client_id,
            facility_id,
            random_name,
            random_name,
            random_name,
            country_id,
            100,
            uom_id
        )
        try:
            result = self.facilityStore.get(client_id, facility_id)
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)
import unittest

from pyramid import testing

import string
import random
import uuid
from uuid import UUID

from saas.app.core.stores.base import StoreException


class TestInventoryItemsStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.modules.inventory.stores.facility import FacilityStore
        from saas.app.modules.inventory.stores.locations import LocationStore
        from saas.app.core.stores.client import ClientStore

        self.mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.facilityStore = FacilityStore(self.mgr, 'default')
        self.locationStore = LocationStore(self.mgr, 'default')
        self.clientStore = ClientStore(self.mgr, 'default')
        self.client = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_location_add(self):
        random_str = self.generate_random_str(10)
        client_id = self.client[0]
        location_id = str(uuid.uuid4())
        facility_id = str(uuid.uuid4())
        country_id = 608 # philippines
        area_uom_id = 1
        try:
            self.facilityStore.add(
                client_id, 
                facility_id, 
                random_str, 
                random_str, 
                random_str,
                country_id,
                100,
                area_uom_id
            )
            self.locationStore.add(
                client_id, 
                location_id,
                facility_id,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str
            )
        except Exception as e:
            self.fail(e)

    def test_location_add_duplicate(self):
        random_str = self.generate_random_str(10)
        client_id = self.client[0]
        location_id = str(uuid.uuid4())
        facility_id = str(uuid.uuid4())
        country_id = 608 # philippines
        area_uom_id = 1

        self.facilityStore.add(
            client_id, 
            facility_id, 
            random_str, 
            random_str, 
            random_str,
            country_id,
            100,
            area_uom_id
        )
        try:
            self.locationStore.add(
                client_id, 
                location_id,
                facility_id,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str
            )

            location_id = str(uuid.uuid4())
            self.assertRaises(
                StoreException,
                self.locationStore.add,
                client_id, 
                location_id,
                facility_id,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str
            )
        except Exception as e:
            self.fail(e)

    def test_location_update(self):
        random_str = self.generate_random_str(10)
        client_id = self.client[0]
        location_id = str(uuid.uuid4())
        facility_id = str(uuid.uuid4())
        country_id = 608 # philippines
        area_uom_id = 1

        self.facilityStore.add(
            client_id, 
            facility_id, 
            random_str, 
            random_str, 
            random_str,
            country_id,
            100,
            area_uom_id
        )
        self.locationStore.add(
            client_id, 
            location_id,
            facility_id,
            random_str,
            random_str,
            random_str,
            random_str,
            random_str,
            random_str,
            random_str
        )

        try:
            random_str = self.generate_random_str(10)
            self.locationStore.update(
                client_id, 
                location_id,
                facility_id,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str,
                random_str
            )
        except Exception as e:
            self.fail(e)

    def test_location_get(self):
        random_str = self.generate_random_str(10)
        client_id = self.client[0]
        location_id = str(uuid.uuid4())
        facility_id = str(uuid.uuid4())
        country_id = 608 # philippines
        area_uom_id = 1

        self.facilityStore.add(
            client_id, 
            facility_id, 
            random_str, 
            random_str, 
            random_str,
            country_id,
            100,
            area_uom_id
        )
        self.locationStore.add(
            client_id, 
            location_id,
            facility_id,
            random_str,
            random_str,
            random_str,
            random_str,
            random_str,
            random_str,
            random_str
        )

        try:
            result = self.locationStore.get(client_id, location_id)
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)


    def test_location_filter(self):
        random_str = self.generate_random_str(10)
        client_id = self.client[0]
        location_id = str(uuid.uuid4())
        facility_id = str(uuid.uuid4())
        country_id = 608 # philippines
        area_uom_id = 1

        self.facilityStore.add(
            client_id, 
            facility_id, 
            random_str, 
            random_str, 
            random_str,
            country_id,
            100,
            area_uom_id
        )
        self.locationStore.add(
            client_id, 
            location_id,
            facility_id,
            random_str,
            random_str,
            random_str,
            random_str,
            random_str,
            random_str,
            random_str
        )

        try:
            result = self.locationStore.filter(client_id, random_str[1:9])
            self.assertGreater(len(result), 0, '{0} {1} {2}'.format(result, random_str, random_str[1:9]))
        except Exception as e:
            self.fail(e)
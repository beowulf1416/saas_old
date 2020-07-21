**Software-As-A-Service**
(final name not decided)

Multi-tenant Business Operations Software

APP_NAME is a Multi-tenant, multi-purpose on-premise or cloud business operations software 
designed to answer most of the needs of a business. It provides many of the services 
needed in the various areas of running an organization.

It crosses many of the functional areas neccessary for any operation such as:
* User, role and permissions management
* Client and tenant management
* Accounting and finance
* Human Resources management
* Inventory management
* Project management

It uses best of breed technologies like:
* built on top of the python pyramid framework
* OAUTH authentication with multiple supported providers
* JWT tokens embedded in signed session cookies
* Custom Web Elements for the frontend
* JSON schema validation

Other target technologies are:
* Apache Kafka for stream processing (alternatively, Apache Pulsar)
* ElasticSearch, LogStash and Kibana for Analytics, log aggregation and auditing

At the moment, the only supported backend storage is postgresql but plans
are in place to add other storage providers.


Documentation: https://beowulf1416.github.io/saas/

'use strict';

class AdminClients {

    add(name, address, func) {
        fetch('/api/admin/clients/add', {

        })
        .then((response) => response.json())
        .then((data) => {
            func(data);
        });
    }
}

export { AdminClients };
const sql = require('./db');

const Client = function(client) {
    this.store_domain = client.store_domain,
    this.host = client.host,
    this.access_token = client.access_token
};

Client.create = (newClient, result) => {
    sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
        if(err) {
            console.log("Error : ", err);
            result(err, null);
            return;
        }
        console.log("Created new client : ", { id : res.insertId, ...newClient});
        result(null, { id: res.insertId, ...newClient});
    });
};

Client.getClientByDomain = (store_domain, result) => {
    sql.query(`SELECT * FROM client WHERE store_domain = '${store_domain}'`, (err, res) => {
        if(err) {
            console.log("Error : ", err);
            result(err, null);
            return;
        }
        if(res.length) {
            console.log("Found client : ", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

module.exports = Client;
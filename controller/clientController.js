const Client = require('../models/client.model');

function create(req, res, next) {
    const client = new Client({
        store_domain: req.body.store_domain,
        host: req.body.host,
        access_token: req.body.access_token
    });

    Client.create(client, (err, data) => {
        if (err) res.send(err);
        else {
            console.log(data);
            res.json(data);
        }
    })
}

function getClientByDomain (req, res, next) {
    Client.getClientByDomain(req.params.store_domain, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.json({message: err.kind});
            } else {
                res.json(err)
            }
        }
        else {
            res.json(data);
        }
    });
}

module.exports = {
    create,
    getClientByDomain
}
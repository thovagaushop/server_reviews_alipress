const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const clientRouter = require('./routes/client.router');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.post('/api/v1/access-token', async(req, res, next) => {
    try {
        console.log(req.body);
        let data = {
            store_domain: req.body.store_domain,
            client_id: req.body.client_id,
            client_secret: req.body.client_secret,
            code: req.body.code
        }
        let response = await axios.post(`https://${data.store_domain}/admin/oauth/access_token?client_id=${data.client_id}&client_secret=${data.client_secret}&code=${data.code}`);
        res.json(response.data.access_token);
    } catch (error) {
        res.json(error);
    }
})

app.post('/api/v1/reviews',async (req, res, next) => {
    try {
        // const data = await axios.get('')
        console.log(req.body);
        let data = await axios.get(`https://app.reviewapi.io/api/v1/reviews?apikey=${process.env.REVIEW_APP_API_KEY}&url=${req.body.productURL}&amount=${req.body.amount}`)
        res.json(data.data)
    } 
    catch(err) {
        res.json(err)
    }
})

app.post('/api/v1/reviews/import', async(req, res, next) => {
    try {
        console.log(req.body);
        let bodyReq = {
            shop_domain: req.body.store_domain,
            platform: "shopify",
            name: req.body.name,
            email: req.body.email,
            rating: 1,
            body: req.body.body,
            id: req.body.id,
            title: req.body.title
        }

        let data = await axios.post('https://judge.me/api/v1/reviews', bodyReq);
        res.json(data.data);
    } catch (error) {
        res.json(error)
    }
})

app.post('/api/v1/products', async (req, res, next) => {
    try {
        let data = await axios.get(`https://${req.body.store_domain}/admin/api/2022-10/products.json`, {
            headers: {
                "X-Shopify-Access-Token": req.body.access_token
            }
        })

        res.json(data.data);
    } catch (error) {
        res.json(error);
    }
})

app.use('/api/v1/client', clientRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
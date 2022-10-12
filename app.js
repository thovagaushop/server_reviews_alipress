const axios = require('axios')
const bodyParser = require('body-parser')
var cors = require('cors')
const express = require('express')
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())

app.post('/reviews',async (req, res, next) => {
    try {
        // const data = await axios.get('')
        console.log(req.body);
        const data = await axios.get(`https://app.reviewapi.io/api/v1/reviews?apikey=4ec224c0-4994-11ed-85e0-2d7a967e64d2&url=${req.body.productURL}&amount=${req.body.amount}`)
        res.json(data.data)
    } 
    catch(err) {
        res.json(err)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
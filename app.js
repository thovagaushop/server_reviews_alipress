const axios = require('axios')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
var cors = require('cors')
const express = require('express')

dotenv.config()

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())

app.post('/reviews',async (req, res, next) => {
    try {
        // const data = await axios.get('')
        console.log(req.body);
        const data = await axios.get(`https://app.reviewapi.io/api/v1/reviews?apikey=${process.env.API_KEY}&url=${req.body.productURL}&amount=${req.body.amount}`)
        res.json(data.data)
    } 
    catch(err) {
        res.json(err)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
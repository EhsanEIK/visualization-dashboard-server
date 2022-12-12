const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// middleware
app.use(cors());
app.use(express());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fbieij7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const dataCollection = client.db('visulaizationDashboardDB').collection('dataCollection');

        app.get('/data', async (req, res) => {
            const query = {};
            const data = await dataCollection.find(query).toArray();
            res.send(data);
        })
    }
    finally { }
}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('Visualization dashboard server is running');
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
})
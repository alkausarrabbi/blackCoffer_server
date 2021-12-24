const express=require("express");
const { MongoClient } = require('mongodb');
const app=express();
require('dotenv').config();
const cors = require('cors');


const port=process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jy706.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        console.log("connected")
        await client.connect();
        const database = client.db('blackcoffer');
        const dataCollection = database.collection('Packages');
     


        app.get('/datas', async (req, res) => {
            const cursor = dataCollection.find({});
            const result = await cursor.toArray();
            res.json(result);

        });
       
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);






app.get('/',(req,res)=>{
    res.send("WelCome To BlackCoffer Database");
})

app.listen(port,()=>{
    console.log("listening carx location is :",port);
})
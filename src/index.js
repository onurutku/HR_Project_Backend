const express = require('express')
const { MongoClient,ObjectId } = require("mongodb");
const uri ="mongodb://onurutku:onurutku123@192.168.0.28:27017/onurutkudb";
const mongoClient=new MongoClient(uri);

let registeredCollection;
let database;
mongoClient.connect().then(()=>{
    database=mongoClient.db("onurutkudb");
    registeredCollection=database.collection("registerCollection");
    console.log("connected to mongodb");
})
const app = express()
const port = 3000
app.use(express.json())

app.get('/onurutku', async function(req, res) {
    const arr=[];
    const cursor=registeredCollection.find();
     await cursor.forEach((element)=>{
        arr.push(element)
     });
     res.json(arr);
})
app.post('/onurutku',(req,res)=>{
    registeredCollection.insertOne(req.body).then(()=>{
        res.json(req.body)
    })
})
app.put("/onurutku/:id",(req,res)=>{
    const filter={_id: new ObjectId(req.params.id)}
    const updateDoc = {
      $set: req.body
    };
    registeredCollection.updateOne(filter,updateDoc,{ upsert: true }).then(()=>{
        res.send("updated");
    })
})
app.delete("/onurutku/:id",(req,res)=>{
     const filter={_id: new ObjectId(req.params.id)}
     registeredCollection.deleteOne(filter).then(()=>{
         res.send("deleted");
     })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

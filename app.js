const express=require('express')
const path=require('path')
const app=express()
const {MongoClient}=require('mongodb')
const url="mongodb://db";
const client=new MongoClient(url);
const port=3000
app.use(express.static(path.join(__dirname, '/image')))
app.get('/',(req, res, next) =>{
    res.sendFile(__dirname+'/static/proba.html')
})
app.get('/persons',async (req, res, next) =>{
    await client.connect()
    let database=client.db('persons').collection('persons')
    let persons=await database.find().toArray();
    console.log(persons);
    client.close()
    res.send(persons);
})
app.get('/docker',(req, res, next) =>{
    res.sendFile(__dirname+'/static/docker.html')
})

app.listen(port)
console.log('Listening on port '+port)
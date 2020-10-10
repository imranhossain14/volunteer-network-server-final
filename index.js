const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors')
// Database connection configuration here
const uri = "mongodb+srv://volunteer-imran:imran123456@cluster0.jsbl6.mongodb.net/volunteer?retryWrites=true&w=majority"

// Make ready app for use with express , cors and bodyParser
const app = express();
const port = 5000;
// nicher duita middlewire client and server er access er permission diche(cros) r body er data gula pares(bodyparse) kore json akare niye astese
app.use(bodyParser.json());
app.use(cors());


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => {
  const userCollection = client.db("volunteer").collection("users");
  const tasksCollection = client.db("volunteer").collection("Tasks");
  const eventsCollection = client.db("volunteer").collection("volunteerEvents");

  // client ja post korbe tar request r server end a ja kaj kora hobe tar response pathabo
  //Create er jah CRUD er
  app.post("/addUser", (req, res) => {
    const Product = req.body;
    userCollection.insertOne(Product)
      .then(result => {
        console.log("data added Successfully");

      })
  })

  //Read Operation of CRUD
  app.get('/users', (req, res) => {
    console.log(req.query.email)
    userCollection.find({
        email: req.query.email
      })
      .toArray((err, documents) => {
        res.send(documents)
      })

  })


  //Delete Operation of CRUD
  app.delete('/delete/:id', (req, res) => {
    userCollection.deleteOne({
        _id: ObjectId(req.params.id)
      })
      .then(result =>
        res.send(result.deletedCount > 0)
      )
  })

// Fetch all users from database
  app.get('/allUsers', (req, res) => {
    userCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })
// Delete user from database
  app.delete('/deleteUser/:id', (req, res) => {
    userCollection.deleteOne({
        _id: ObjectId(req.params.id)
      })
      .then(result =>
        console.log(result)
      )
  })

  // adding task by user
  app.post("/addTasks", (req, res) => {
    const Product = req.body;
    tasksCollection.insertOne(Product)
      .then(result => {
        console.log("data added Successfully");

      })
  })
  // adding event by users
  app.post("/addEvent", (req, res) => {
    const Product = req.body;
    eventsCollection.insertOne(Product)
      .then(result => {
        console.log("data added Successfully");

      })
  })

  app.get('/events', (req, res) => {
    eventsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  app.get('/tasks', (req, res) => {
    tasksCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  app.get('/', (req, res) => {

    res.send('My Database Server Code is working. Yaah!!!!!!')

  })
});


app.listen(process.env.PORT || port);
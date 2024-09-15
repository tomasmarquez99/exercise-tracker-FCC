const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose= require('mongoose')

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.PASS

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/*const client = new MongooseClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
*/
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri);
    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    }
}
run();

const userSchema = new mongoose.Schema({
username: String,
description: String,
duration: Number,
date: Date
})

const User = mongoose.model('User', userSchema);

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', (req,res) => {
const username = req.body.username

async function run(){
  await User.create({username: username})
}
run();

})

app.post('/api/users/:_id/exercises',(req,res) =>
{})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

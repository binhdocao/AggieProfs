
const uri = "mongodb+srv://aggieStudent:howdy@aggiedata.pvz7zwy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1
  }
});

app.use(cors()); // Enable CORS for all routes

app.get('/professors', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("AggieProfs");
    const professors = database.collection("professors");
    const professorList = await professors.find({}).toArray();
    res.json(professorList);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await client.close();
  }
});

const port = 3001; // Ensure this is a different port from your React app
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

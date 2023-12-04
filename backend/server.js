const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();


const uri = "mongodb+srv://aggieStudent:howdy@aggiedata.pvz7zwy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1
  }
});

app.use(cors());

let db;

// Connect to the database once at the start of the app
client.connect().then(client => {
  db = client.db("AggieProfs");
  console.log("Connected to MongoDB");
}).catch(e => {
  console.error("Failed to connect to MongoDB", e);
  process.exit(1);
});

// Get a list of all professors
app.get('/professors', async (req, res) => {
  try {
    const professors = db.collection("professors");
    const professorList = await professors.find({}).toArray();
    res.json(professorList);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Get details for a single professor
app.get('/professors/:id', async (req, res) => {
  try {
    const professors = db.collection("professors");
    // Use `new` to create a new ObjectId instance
    const professor = await professors.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!professor) {
      return res.status(404).json({ error: "Professor not found" });
    }

    res.json(professor);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});




const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// // Properly handle SIGINT (Ctrl+C) and SIGTERM (docker stop)
// process.on('SIGINT', () => client.close().then(() => process.exit(0)));
// process.on('SIGTERM', () => client.close().then(() => process.exit(0)));

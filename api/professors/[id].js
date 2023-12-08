const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1 } });

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const professorId = req.query.id;
  if (!professorId) {
    return res.status(400).json({ error: 'Missing professor ID' });
  }

  try {
    await client.connect();
    const db = client.db("AggieProfs");
    const professors = db.collection("professors");
    const professor = await professors.findOne({ _id: new ObjectId(professorId) });

    if (!professor) {
      return res.status(404).json({ error: "Professor not found" });
    }

    res.status(200).json(professor);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
};

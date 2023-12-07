import { connectToDatabase } from '../lib/mongodb';


export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { database } = await connectToDatabase();
            const professors = database.collection('professors');
            const professorList = await professors.find({}).toArray();
            res.status(200).json(professorList);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

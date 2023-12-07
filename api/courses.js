import { connectToDatabase } from '../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { database } = await connectToDatabase();
            const courses = database.collection('courses');
            const courseList = await courses.find({}).toArray();
            res.status(200).json(courseList);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
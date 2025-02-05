import mongo from '../database/mongo.connection.js';

const client = await mongo.connectToMongo();
// const close = await mongo.closeClient()

const mydb = 'DMusic';

export default {
	// @route   GET api/comms 
	// @desc    See all the notifications
	// @access  Public
	getPlaylists: async (req, res) => {

		try {
			const db = client.db(mydb)
			const collection = db.collection('playlists')
			const result = await collection.find({}).toArray();

            console.log(result);
			res.json(result)
		} finally {
			//close()
			//console.log('supuesto cierre de BBDD')
			await mongo.closeClient()
		}
	}, 
    getLopd: async (req, res) => {
        try{
            const db = client.db(mydb);
            const collection = db.collection('lopd');
            const result = await collection.find({}).toArray();

            res.json(result);
        } finally {
            await mongo.closeClient();
        }
    }
}
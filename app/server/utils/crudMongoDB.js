/*
Ticket de Jira: KAN-48
Nombre: Gema
Fecha: 24/01/25
Descripcion: Refactorizar las funciones de MongoDB en un fichero CRUD
*/

import mongo from '../database/mongo.connection.js';

const client = await mongo.connectToMongo();
const close = await mongo.closeClient();

const mydb = 'trainingpro';

/* --------- CRUD -----------*/
export default {

    getAll: async (collectionName) => {
        let result={};
        try {
            const db = client.db(mydb);
            const collection = db.collection(collectionName);
            result = await collection.find({}).toArray();
        } finally {
            //close();
        }

        return result;
    },

    postComms: async (collectionName, data) => {
        let result={};
		try {
			const db = client.db(mydb);
			const collection = db.collection(collectionName);
			result = await collection.insertOne(data);
            console.log(result)
		} finally {
			/* close() */
		}
    
        return result;
	},

    lopdGet: async (collectionName) => {
        let result={};
		try {
			const db = client.db(mydb);
			const collection = db.collection(collectionName);
			result = await collection.find({}).toArray();
		} finally {
			/* close() */
		}

        return result;
	}
}
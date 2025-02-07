import crudMysql from '../utils/crudMysql.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

const { sign, verify } = jwt;

export default {
    /**
     * Función que buscará el usuario en las tablas
     * @param {*} res -> response
     * @param {*} tableName -> Nombre de la tabla
     * @param {*} login -> Email del usuario
     * @param {*} pass -> Contraseña del usuario
     * @returns 
     */
    testInTables: async (res, tableName, login, pass) => {
        // Crear un arreglo con los valores del cuerpo de la solicitud (query) 
        /*
        SELECT email, pass FROM users WHERE email = ? AND pass = ?;
        SELECT ??, ?? FROM ?? WHERE ?? = ? AND ?? = ?;
        */
        let values = ['email', 'pass', `${tableName}`, 'email', login, 'pass', pass];
        // Llamamos a loginAlumn para obtener usuarios con esos datos
        let user = await crudMysql.loginAlumn(values);

        //Si el usuario no existe en la tabla, devuelve true
        if (user[0].length === 0) {
            console.log(`No está en ${tableName}`);
            return true;
            //Si el usuario existe en la tabla, devuelve false
        } else {
            console.log(`Está en ${tableName}`);

            //Configuramos el objeto con el que construiremos el token
            const tokenFrom = { ...user[0][0]};

            //Generamos el token con todos los datos del usuario
            sign(tokenFrom, TOKEN_SECRET, { expiresIn: '10000' }, (err, token) => {
                if (err) {
                    return res.status(401).json({ error: 'El usuario y/o contraseña no válido' });
                }
                // Combinar los objetos de la respuesta
                const response = {
                    message: '---- Usuario logueado correctamente ------',
                    token: 'Bearer ' + token
                }
                // Enviar la respuesta combinada
                return res.status(202).json(response);
            })
            return false;
        }
    }
}
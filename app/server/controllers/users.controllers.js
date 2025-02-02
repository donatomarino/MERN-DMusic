import crudMysql from "../utils/crudMysql.js";
import jwt from "jsonwebtoken";
import searchInTables from "../utils/searchInTables.js";
import { TOKEN_SECRET } from "../config.js";
import { clearParserCache } from "mysql2";

const { sign, verify } = jwt;

export default {
	login: async (req, res) => {
		try {
			// Obtener los datos del cuerpo de la solicitud
			const { login, pass } = req.body

			// Verificar que no hayan campos en null
			if (!login || !pass) {
				return res.status(400).json({ message: 'Faltan datos obligatorios' })
			}

			//Validamos si el usuario existe en las distintas tablas. Si no existe en ninguna, respuesta con error - KAN-42
			await searchInTables.testInTables(res, 'users', login, pass) &&
				res.status(404).json({ error: 'El usuario no existe' });
		} catch (error) {
			console.error('Error al hacer login:', error)
			res.status(500).json({ message: 'Error al hacer login: ', error })
		}
	},
	recoveryPass: async (req, res) => {
		try {
			// Obtenemos el mail desde el cuerpo de la solicitud
			const { email } = req.body;

			if (!email) {
				return res.status(400).json({ message: 'Faltan datos obligatorios' })
			};

			// Creamos arreglo para buscar el usuario
			const values = ['users', 'email', email];
			// Buscamos el mail en la tabla de usuarios
			const infoUser = await crudMysql.getUser(values);

			// Si el email no existe devuelve el error 404
			if (infoUser.length === 0) {
				return res.status(404).json({ message: 'El usuario no existe' })
			}

			// Configuramos el objeto con el que construiremos el token
			sign({ email }, TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
				if (err) {
					return res
						.status(401)
						.json({ message: 'Error al generar el token' })
				}

				// Devolver el token
				return res
					.status(200)
					.json({
						message:
							'Token generado correctamente',
						token: `Bearer: ${token}`
					});
			});

		} catch (e) {
			console.error('Error al recuperar la contraseña:', e)
			res.status(500).json({ message: 'Error al recuperar la contraseña: ', e })
		}
	},
	confirmRecovery: async (req, res) => {
		try {
			verify(req.params.token, TOKEN_SECRET, (err, decoded) => {

				// Si hay un error respondemos con el
				if (err) {
					return res
						.status(401)
						.json({ message: 'Error al validar el token', error: err });
				} else {
					// Extraemos el mail del payload
					const { email } = decoded;

					// Actualizamos la base de datos
					const { newPass } = req.body;
					// UPDATE 'users' SET 'password' = 'nuevaPass' WHERE 'email' = 'email';
					const values = ['users', 'pass', newPass, 'email', email];
					crudMysql.updatePass(values);

					// Enviamos la respuesta exitosa
					return res
						.status(200)
						.json({ message: 'Contraseña actualizada correctamente' });
				}
			});
		} catch (e) {
			console.log("Error en actualizar la contraseña", e);
			res.status(500).json({ message: "Error en el servidor: ", error: e });
		}
	},
	register: async (req, res) => {
		try {
			// Obtenemos toda la información desde el cuerpo de la solicitud
			const { full_name, email, pass, birthday, gender } = req.body;
	
			if (!email || !full_name || !pass || !birthday || !gender) {
				return res.status(400).json({ message: 'Faltan datos obligatorios' });
			}
	
			// Verificamos si el usuario ya existe
			console.log(full_name, email, pass, birthday, gender);
			const values = ['users', 'email', email];
			const verifyIfExist = await crudMysql.getUser(values);
			console.log(verifyIfExist[0]);
	
			// Si ya existe devuelve error, sino lo crea
			if (verifyIfExist[0]) {
				return res.status(401).json({ message: "El usuario ya está registrado" });
			} else {
				// Valores para insertar en la base de datos
				const values = ['users', full_name, email, pass, birthday, gender];
				await crudMysql.createUser(values);
	
				return res.status(200).json({
					message: `${email} registrado correctamente! `
				});
			}
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: "Error en el registro", err });
		}
	}	
}
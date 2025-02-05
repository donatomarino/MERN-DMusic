import {Router} from 'express';
import users from '../controllers/users.controllers.js';
import mongo from '../controllers/mongo.controllers.js';

const router = Router();

// Rutas para el login MySQL
router.post('/dmusic/login', users.login);
router.post('/dmusic/recovery-password', users.recoveryPass);
router.post('/dmusic/confirm-recovery/:token', users.confirmRecovery);
router.post('/dmusic/register', users.register);  

// Rutas MySQL sacar tablas

// Rutas para sacar playlist y lopd mongoDB
router.get('/dmusic/playlist', mongo.getPlaylists);
router.get('/dmusic/lopd', mongo.getLopd);


export {router};
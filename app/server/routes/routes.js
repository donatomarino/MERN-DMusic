import {Router} from 'express';
import users from '../controllers/users.controllers.js';
const router = Router();

// Rutas para el login MySQL
router.post('/dmusic/login', users.login);
router.post('/dmusic/recovery-password', users.recoveryPass);
router.post('/dmusic/confirm-recovery/:token', users.confirmRecovery);
router.post('/dmusic/register', users.register);    


export {router};
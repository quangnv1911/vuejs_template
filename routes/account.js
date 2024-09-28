import express from 'express';
import { accountController } from '../controllers/index.js'

const router = express.Router();

router.post('/login', accountController.login);

export default router;
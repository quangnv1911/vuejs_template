import express from 'express';
import homePageInfo from '../controllers/homePageInfo.js';

const router = express.Router();

router.post('/update', homePageInfo.updateHomePageInfo);

export default router;
import express from 'express';

const router = express.Router();

import release from './release';
router.use('/release', release);

export default router;

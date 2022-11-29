import express from 'express';
import { getProgressions, getProgressionsByProgression, createProgression } from '../handlers/progressionsHandler.js';
const router = express.Router();

router.get('/', getProgressions);
router.post('/', createProgression);
router.get('/', getProgressionsByProgression);

export default router;
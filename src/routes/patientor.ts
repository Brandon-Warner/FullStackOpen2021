import express from 'express';
import patientorService from '../services/patientorService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientorService.getDiagnoses());
});

router.post('/', (_req, res) => {
    res.send('Saving new patient info');
});

export default router;

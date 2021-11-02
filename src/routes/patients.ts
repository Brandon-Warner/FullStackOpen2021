import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitiveInfoPatients());
});

router.post('/', (_req, res) => {
    res.send('Saving new patient info');
});

export default router;

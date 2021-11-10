/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitiveInfoPatients());
});

router.post('/', (req, res) => {
    try {
        
        const newPatient = toNewPatientEntry(req.body);

        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        res.status(400).send((error as Error).message);
    }
});

export default router;

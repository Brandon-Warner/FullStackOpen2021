import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send('Fetching all patient info');
});

router.post('/', (_req, res) => {
    res.send('Saving new patient info');
});

export default router;

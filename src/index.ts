import express from 'express';
const app = express();
app.use(express.json());

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';


const PORT = 3001;

app.get('/ping', (_req, res) => {
    console.log('ping');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
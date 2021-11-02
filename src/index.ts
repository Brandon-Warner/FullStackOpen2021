import express from 'express';
const app = express();
app.use(express.json());

import diagnosesRouter from './routes/patientor';

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('ping');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
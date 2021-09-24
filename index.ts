import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator'

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', async (req, res) => {

    let { pounds, height } = req.query;
    
    const bmiInfo = calculateBmi(Number(pounds), Number(height));

    const bmiJson = {
        weight: pounds,
        height: height, 
        bmiInfo
    }
    try{
        res.json(bmiJson);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`);
});

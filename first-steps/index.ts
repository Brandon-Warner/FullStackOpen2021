/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.json());
import { calculateBmi } from './bmiCalculator';
import { parseExerciseArguments, calculateExercise } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    const pounds = req.query.pounds;
    const height = req.query.height;
    
    const bmiInfo = calculateBmi(Number(pounds), Number(height));

    const bmiJson = {
        weight: pounds,
        height: height, 
        bmiInfo
    };
    try{
        res.json(bmiJson);
    } catch (error) {
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(500).send({error: error.message});
    }
});

app.post('/exercises', (req ,res) => {
    console.log('request: ',req);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const dailyTarget = req.body.target;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const dailyExercises= req.body.daily_exercises;


    if (!dailyExercises || !dailyTarget) {
        res.status(400);
        res.send({
            error: 'missing parameters daily_exercises or target'
        });
    } else {
        try{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const { target, dailyExerciseHours } = parseExerciseArguments(
                dailyTarget,
                dailyExercises
            );
            res.send(calculateExercise(target, dailyExerciseHours));
        } catch (e) {
            res.status(400);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            res.send({ error: e.message });
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`);
});

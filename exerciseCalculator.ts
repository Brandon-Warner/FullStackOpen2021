interface ExerciseValues {
   target: number;
   dailyExerciseHours: Array<number>;
}

const parseExerciseArguments = (
    target: number,
    dailyExercise: Array<number>
): ExerciseValues => {
    if(!isNaN(target) && !dailyExercise.some(isNaN)) {
        return {
            target: target,
            dailyExerciseHours: dailyExercise
        };
    } else {
        throw new Error('Provided values were not numbers');
    }
};

interface AverageValues {
    periodLength: number;
    traningDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exerciseCalculator = (
    target: number, 
    dailyExerciseHours: Array<number>
): AverageValues => {
    let rating;
    let ratingDescription;
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(day => day > 0).length;
    const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;

    const success = average >= target ? true : false;

    if (average < target) {
        rating = 1;
        ratingDescription = 'made an effort, but could have been closer to target';
    } else if (average === target) {
        rating = 2;
        ratingDescription = 'way to hit the target, nice job';
    } else if (average > target){
        rating = 3;
        ratingDescription = 'incredible! way to go above and beyond';
    }

    return{
        periodLength: periodLength,
        traningDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };

};

const dailyExerciseHours: Array<number> = [];
const target: number = Number(process.argv[2]);

// VALIDATES CL INPUT WILL ONLY TAKE NUMBERS & ENDS IF INPUT ENDS //
for (let i = 1; i <= process.argv.length; i++) {
    let day: number = (Number(process.argv[2 + i]));
    if (isNaN(day)){
        break;
    }
    dailyExerciseHours.push(day);
}


try{
    console.log(exerciseCalculator(target, dailyExerciseHours));
} catch (e) {
    console.log('Error: ', e);
};
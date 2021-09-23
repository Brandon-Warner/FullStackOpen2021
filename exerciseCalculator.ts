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
    } else {
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

try{
    console.log(exerciseCalculator(2, [2, 2, 2.5, 4, 5, 2, 0]));
} catch (e) {
    console.log('Error: ', e);
};
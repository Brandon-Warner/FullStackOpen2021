// BMI = weight(lbs) / height(in) ^ 2 * 703

const calculateBmi = (pounds: number, height: number): String => {
    const BMI = (pounds) / Math.pow(height, 2) * 703;
    if (BMI >= 18.5 && BMI < 25)
        return 'Normal (healthy weight)';
    else if (BMI > 25 && BMI < 30)
        return 'Overweight (slightly unhealthy weight)';
    else if (BMI < 18.5) 
        return 'Underweight (slightly unhealthy weight)';
    else if (BMI >= 30)
        return 'Obese (very unhealthy weight)';
    else 
        return 'could not calculate BMI with these parameters';
}

console.log(calculateBmi(161, 70));
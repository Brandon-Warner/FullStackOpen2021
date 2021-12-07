import React from 'react'

type Course = {
    name: string;
    exerciseCount: number;
}

interface CourseParts {
    courseParts: Course[];
}

const Total = ({courseParts}: CourseParts) => {
    return (
        <p>
            Number of courses{' '}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
}

export default Total

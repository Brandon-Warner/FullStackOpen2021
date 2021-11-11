import React from 'react'
import { CoursePart } from '../types'

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch(part.type){
        case "normal":
            return(
                <p>{part.name} {part.exerciseCount} {part.description}</p>
            )
        case "groupProject":
            return(
                <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
            )
        case "submission":
            return(
                <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
            )
        default: 
        return assertNever(part);
    }
}

export default Part

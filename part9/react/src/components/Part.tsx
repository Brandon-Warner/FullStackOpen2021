import React from 'react'
import { CoursePart } from '../types'

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch(part.type){
        case "normal":
            return(
                
                <p><b>{part.name} {part.exerciseCount}</b>
                <br />
                <i>{part.description}</i></p>
                
            )
        case "groupProject":
            return(
                <p><b>{part.name} {part.exerciseCount}</b>
                <br />
                <i>{part.groupProjectCount}</i></p>
            )
        case "submission":
            return(
                <p><b>{part.name} {part.exerciseCount}</b>
                <br />
                <i>{part.description}</i> 
                <br />
                submit here: <i>{part.exerciseSubmissionLink}</i></p>
            )
        case "special": 
                return(
                    <p><b>{part.name} {part.exerciseCount}</b>
                    <br />
                    <i>{part.description}</i>
                    <br />
                    requirements: 
                    <ul>
                    {part.requirements.map(r => (
                        <li key={r}>
                            {r}
                        </li>
                    ))}</ul></p>
                )
        default: 
        return assertNever(part);
    }
}

export default Part

import React from 'react'

type Course = {
    name: string;
    exerciseCount: number;
}

interface CourseParts {
    courseParts: Course[];
}

const Content = ({courseParts}: CourseParts) => {
    return(
        <div>
            {courseParts.map((course: Course) => (
                <p key={course.name}>
                    {course.name} {course.exerciseCount}
                </p>
                )
            )}
        </div>
    )
}

export default Content

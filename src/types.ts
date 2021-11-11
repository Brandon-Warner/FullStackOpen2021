export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

export interface CoursePartBaseWithDescription extends CoursePartBase{
    description: string;
  }

export interface CourseNormalPart extends CoursePartBaseWithDescription {
    type: "normal";
  }
export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
export interface CourseSubmissionPart extends CoursePartBaseWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;
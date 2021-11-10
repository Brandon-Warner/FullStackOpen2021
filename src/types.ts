export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    ssn?: string;
    occupation?: string;
}

export type NonSensitiveInfoPatients = Omit<Patients, 'ssn'>;

export type NewPatientEntry = Omit<Patients, 'id'>;
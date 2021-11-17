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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry{
}

// export interface Patient {
//     id: string;
//     name: string;
//     ssn: string;
//     occupation?: string;
//     gender: Gender;
//     dateOfBirth: string;
//     entries: Entry[];
// }

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    ssn?: string;
    occupation?: string;
    entries: Entry[];
}

export type NonSensitiveInfoPatients = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
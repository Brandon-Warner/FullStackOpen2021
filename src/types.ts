export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

// export type Gender = 'male' | 'female' | 'other';

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    ssn?: string;
    occupation?: string;
}

export type NonSensitiveInfoPatients = Omit<Patients, 'ssn'>;
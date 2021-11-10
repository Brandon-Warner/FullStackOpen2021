import { NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return dateOfBirth;
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};


type Fields = { name: unknown , dateOfBirth: unknown, gender : unknown, ssn: unknown, occupation: unknown };

const toNewPatientEntry = ({name, dateOfBirth, gender, ssn, occupation} : Fields): NewPatientEntry => {
    const newPatient: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    };
    return newPatient;
};

export default toNewPatientEntry;
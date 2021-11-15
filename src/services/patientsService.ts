import patientData from '../../data/patientData';
import { Patients, PublicPatient, NonSensitiveInfoPatients, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';
const id: string = uuid();


const getPatients = (): Array<Patients> => {
    return patientData;
};

const getNonSensitiveInfoPatients = ():NonSensitiveInfoPatients[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = (entry: NewPatientEntry): Patients => {
    const newPatient = {
        id: id,
        ...entry
    };
    patientData.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): PublicPatient | undefined => {
    const patient = patientData.find(p => p.id === id);
    return patient;
};

export default {
    getPatients, 
    addPatient,
    getNonSensitiveInfoPatients,
    getPatient
};
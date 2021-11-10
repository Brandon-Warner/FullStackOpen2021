import patientData from '../../data/patientData';
import { Patients, NonSensitiveInfoPatients, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';
const id: string = uuid();


const getPatients = (): Array<Patients> => {
    return patientData;
};

const getNonSensitiveInfoPatients = ():NonSensitiveInfoPatients[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
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

export default {
    getPatients, 
    addPatient,
    getNonSensitiveInfoPatients
};
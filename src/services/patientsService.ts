import patientData from '../../data/patientData';
import { Patients, NonSensitiveInfoPatients } from '../types';


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

const addPatients = () => {
    return null;
};

export default {
    getPatients, 
    addPatients,
    getNonSensitiveInfoPatients
};
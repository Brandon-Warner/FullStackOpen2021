import diagnosisData from '../../data/diagnosesData';
import { Diagnosis } from '../types';


const getDiagnosis = (): Array<Diagnosis> => {
    return diagnosisData;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getDiagnosis, 
    addDiagnosis
};
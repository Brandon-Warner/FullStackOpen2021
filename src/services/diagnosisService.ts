import diagnosisData from '../../data/diagnosesData';
import { Diagnosis } from '../types';


const getDiagnoses = (): Array<Diagnosis> => {
    return diagnosisData;
};

const addDiagnoses = () => {
    return null;
};

export default {
    getDiagnoses, 
    addDiagnoses
};
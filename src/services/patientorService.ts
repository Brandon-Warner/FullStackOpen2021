import diagnosesData from '../../data/diagnosesData';
import { Diagnoses } from '../types';


const getDiagnoses = (): Array<Diagnoses> => {
    return diagnosesData;
};

const addDiagnoses = () => {
    return null;
};

export default {
    getDiagnoses, 
    addDiagnoses
};
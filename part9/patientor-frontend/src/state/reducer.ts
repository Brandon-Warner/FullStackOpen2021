import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_FETCHED_PATIENT";
      payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_FETCHED_PATIENT": 
      return {
        ...state,
        fullPatientInfo: {
          ...state.fullPatientInfo,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return{
        ...state,
        diagnosisList: {
          ...action.payload.reduce(
          (memo, diagnosis) => ( { ...memo, [diagnosis.code]: diagnosis }),
          {}
          )
        }
      };
    default:
      return state;
  }
};

export const addPatient = (patient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: patient };
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {type: "SET_PATIENT_LIST", payload: patientListFromApi};
};

export const setFetchedPatient = (patient: Patient): Action => {
  return {type: "SET_FETCHED_PATIENT", payload: patient};
};

export const setDiagnosisList = (diagnosisCodes: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSIS_LIST", payload: diagnosisCodes};
};
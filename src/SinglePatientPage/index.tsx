import React from 'react';
import axios from 'axios';
import {  Diagnosis, Entry, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setFetchedPatient, setDiagnosisList } from '../state';
import { useParams } from 'react-router';
import EntryList from './EntryList';




const SinglePatientPage: React.FC = () => {
    const [{ fullPatientInfo, diagnosisList }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient | undefined>();
    console.log('patient: ', patient);
    const [error, setError] = React.useState<string | undefined>();

    const setErrorMessage = (message: string) => {
        setError(message);
        setTimeout(() => setError(undefined), 5000);
      };

    React.useEffect(() => {
        const getPatient = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(
                  `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setFetchedPatient(patient));
                setPatient(patient);
              } catch (error: unknown) {
                let errorMessage = 'something went wrong';
                if(error instanceof Error) {
                    errorMessage = error.message;
                }
                setErrorMessage(errorMessage);
              }
        };

        const fetchDiagnosisList = async () => {
            try {
                const { data: diagnosisList } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnosis`
                );
                dispatch(setDiagnosisList(diagnosisList));
            } catch (error: unknown) {
                let errorMessage = 'something went wrong';
                if(error instanceof Error) {
                    errorMessage = error.message;
                }
                setErrorMessage(errorMessage);
            }
        };

        if (fullPatientInfo[id]) {
            setPatient(fullPatientInfo[id]);
        } else {
            void getPatient();
        }

        if (Object.values(diagnosisList).length === 0) {
            void fetchDiagnosisList();
        }
    }, [dispatch, id, fullPatientInfo, diagnosisList]);

    if (!patient || !diagnosisList) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {error && (
                <div>{error}</div>
            )}
        <h1>{patient?.name}</h1>
        <div>
            <b>SSN: </b>{patient?.ssn}
        </div>
        <div>
            <b>Occupation: </b>{patient?.occupation}
        </div>
        <div>
            <b>Gender: </b>{patient?.gender}
        </div>
        <div>
            <b>Date of Birth: </b>{patient?.dateOfBirth}
        </div>
        <div>
            <br />
            <h3>Entries: </h3>
            {patient?.entries.map((e: Entry) => (
                <EntryList key={Math.random()*100} entry={e} />
            ))}
        </div>
        </div>
        
    );
};

export default SinglePatientPage;
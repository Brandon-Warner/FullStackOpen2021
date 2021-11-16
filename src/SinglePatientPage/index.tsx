import React from 'react';
import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setFetchedPatient } from '../state';
import { useParams } from 'react-router';


const SinglePatientPage: React.FC = () => {
    const [{ fullPatientInfo }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient | undefined>();
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
        if (fullPatientInfo[id]) {
            setPatient(fullPatientInfo[id]);
        } else {
            void getPatient();
        }
    });

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
            <b>Entries: </b>
            <ul>
                {patient?.entries.map(e => (
                    <li key={Math.random()}>{e}</li>
                )
                )}
            </ul>
        </div>
        </div>
        
    );
};

export default SinglePatientPage;
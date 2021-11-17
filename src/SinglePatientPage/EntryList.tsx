import React from 'react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';



const Hospital: React.FC<{entry: HospitalEntry}> = ({entry}) => {
    return(
        <div>
            <p><i>{entry.date}</i> {entry.description}</p>
            <p><b>Attending specialist:</b> {entry.specialist}</p>
            
            <p><b>Codes: </b></p>
            <ul>
                {entry.diagnosisCodes && 
                entry.diagnosisCodes.map((d) => (
                    <li key={d}>{d}</li>
                    ))
                }
            </ul>
             
            <p><b>Discharged: </b>{entry.discharge?.date} {entry.discharge?.criteria}</p>
        </div>
    ); 
};

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    return(
        <div>
            <p><i>{entry.date}</i> {entry.description}</p>
            <p><b>Attending specialist:</b> {entry.specialist}</p>
            
            <p><b>Codes: </b></p>
            <ul>
                {entry.diagnosisCodes ? 
                entry.diagnosisCodes.map(d => (
                    <li key={d}>{d}</li>
                ))
                : null
            }
            </ul>
        </div>
    );
};

const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
    return(
        <div>
            <p><i>{entry.date}</i> {entry.description}</p>
            <p><b>Attending specialist:</b> {entry.specialist}</p>
            <p><b>Employer Name: </b> {entry.employerName}</p>
            {entry.sickLeave &&
                <div>
                    <h4>Sick Leave</h4>
                    <p>
                        {entry.sickLeave?.startDate} - {entry.sickLeave.endDate}
                    </p>
                </div>    
            }
            
            <br />
            {entry.diagnosisCodes && (
                <div>
                    <p><b>Codes: </b></p>
                    <ul>
                        {entry.diagnosisCodes.map(d => (
                        <li key={Math.random() * 100}>{d}</li>
                            ))
                        }
                    </ul>
                </div>
            )
    }
            
        </div>
    );
};

const EntryList: React.FC<{entry: Entry}> = ({entry}) => {
    console.log('entry: ', entry);
    switch(entry.type){
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "Hospital":
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
           return <OccupationalHealthcare entry={entry} />;
        default: 
        return null;    
    }

};

export default EntryList;

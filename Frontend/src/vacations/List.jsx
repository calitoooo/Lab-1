import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { vacationService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [vacations, setVacations] = useState(null);

    useEffect(() => {
        vacationService.getAll().then(x => setVacations(x));
    }, []);

    function deleteVacation(id) {
        setVacations(vacations.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        vacationService.delete(id).then(() => {
            setVacations(vacations => vacations.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Vacations</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Vacation</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Class</th>
                        <th style={{ width: '30%' }}>Type of Vacation</th>
                        <th style={{ width: '30%' }}>Competition</th>
                        <th style={{ width: '30%' }}>Type of Training</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {vacations && vacations.map(vacation =>
                        <tr key={vacation.id}>
                            <td>{vacation.teacher}</td>
                            <td>{vacation.class}</td>
                            <td>{vacation.typeOfVacations}</td>
                            <td>{vacation.competition}</td>
                            <td>{vacation.typeOfTraining}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${vacation.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteVacation(vacation.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={vacation.isDeleting}>
                                    {vacation.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!vacations &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {vacations && !vacations.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Vacations To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };
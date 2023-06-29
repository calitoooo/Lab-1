import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { roomService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        roomService.getAll().then(x => setRooms(x));
    }, []);

    function deleteRoom(id) {
        setRooms(rooms.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        roomService.delete(id).then(() => {
            setRooms(rooms => rooms.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Rooms</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Room</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '25%' }}>Teacher</th>
                        <th style={{ width: '20%' }}>Department</th>
                        <th style={{ width: '20%' }}>Class</th>
                        <th style={{ width: '25%' }}>Type of Activity</th> 
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {rooms && rooms.map(room =>
                        <tr key={room.id}>
                            <td>{room.teacher}</td>
                            <td>{room.department}</td>
                            <td>{room.class}</td>
                            <td>{room.typeOfActivity}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${room.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteActivity(room.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={room.isDeleting}>
                                    {room.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!rooms &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {rooms && !rooms.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Rooms To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { roomService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        teacher: Yup.string()
            .required('Teacher is required'),
        department:Yup.string()
            .required('Department is required'),
        class: Yup.string()
            .required('Class is required'),
        typeOfActivity: Yup.string()
            .required('Type of Activity is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createRoom(data)
            : updateRoom(id, data);
    }

    function createRoom(data) {
        return roomService.create(data)
            .then(() => {
                alertService.success('Room added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateRoom(id, data) {
        return roomService.update(id, data)
            .then(() => {
                alertService.success('Room updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            roomService.getById(id).then(room => {
                const fields = ['teacher', 'class', 'typeOfActivity'];
                fields.forEach(field => setValue(field, room[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Room' : 'Edit Room'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Teacher</label>
                    <input name="teacher" type="text" ref={register} className={`form-control ${errors.teacher ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.teacher?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Department</label>
                    <input name="department" type="text" ref={register} className={`form-control ${errors.department ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.department?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Class</label>
                    <input name="class" type="text" ref={register} className={`form-control ${errors.class ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.class?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Type of Activity</label>
                    <input name="typeOfActivity" type="text" ref={register} className={`form-control ${errors.typeOfActivity ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.typeOfActivity?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };
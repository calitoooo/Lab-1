import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { vacationService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        teacher: Yup.string()
            .required('Teacher is required'),
        class: Yup.string()
            .required('Class is required'),
        typeOfVacations: Yup.string()
            .required('Type of vacations is required'),
        competition: Yup.string()
            .required('Competition is required'),
        typeOfTraining: Yup.string()
            .required('Type of training is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createVacation(data)
            : updateVacation(id, data);
    }

    function createVacation(data) {
        return vacationService.create(data)
            .then(() => {
                alertService.success('Vacation added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateVacation(id, data) {
        return vacationService.update(id, data)
            .then(() => {
                alertService.success('Vacation updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            vacationService.getById(id).then(vacation => {
                const fields = ['teacher', 'class', 'typeOfVacations', 'competition', 'typeOfTraining'];
                fields.forEach(field => setValue(field, vacation[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Vacation' : 'Edit Vacation'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Teacher</label>
                    <input name="teacher" type="text" ref={register} className={`form-control ${errors.teacher ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.teacher?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Class</label>
                    <input name="class" type="text" ref={register} className={`form-control ${errors.class ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.class?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Type of Vacation</label>
                    <input name="typeOfVacations" type="text" ref={register} className={`form-control ${errors.typeOfVacations ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.typeOfVacations?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Competition</label>
                    <input name="competition" type="text" ref={register} className={`form-control ${errors.competition ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.competition?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Type of Training</label>
                    <input name="typeOfTraining" type="text" ref={register} className={`form-control ${errors.typeOfTraining ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.typeOfTraining?.message}</div>
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
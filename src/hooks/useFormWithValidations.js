import { useEffect, useMemo, useState } from "react";



export const useFormWithValidations = ( initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
      createValidators();
    }, [formState])


    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    };


    const createValidators = () => {
        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = 'Este campo es requerido'] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    };


    const onResetForm = () => {
        setFormState( initialForm );
    }


    return {
        ...formState,                   //esparce las propiedades y las expone
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}
import { useReducer } from 'react';
import useFieldValidations from './useFieldValidations';
import { INITIAL_VALUES, LoginReducer } from './loginReducer';
import { UPDATE_EMAIL, UPDATE_PASSWORD } from './loginActions';

export function useLogin() {
    const [loginStore, dispatch] = useReducer(LoginReducer, INITIAL_VALUES);
    const { isValidEmail, isValidPassword } = useFieldValidations();

    const updateEmail = (value) => {
        dispatch({
            type: UPDATE_EMAIL,
            payload: {
                ...loginStore.email,
                touched: true,
                isValid: true,
                value
            }
        });
    };

    const validateEmail = () => {
        dispatch({
            type: UPDATE_EMAIL,
            payload: {
                ...loginStore.email,
                touched: true,
                isValid: isValidEmail(loginStore.email.value)
            }
        });
    };

    const updatePassword = (value) => {
        dispatch({
            type: UPDATE_PASSWORD,
            payload: {
                ...loginStore.password,
                touched: true,
                isValid: true,
                value
            }
        });
    };

    const validatePassword = () => {
        dispatch({
            type: UPDATE_PASSWORD,
            payload: {
                ...loginStore.password,
                touched: true,
                isValid: isValidPassword(loginStore.password.value)
            }
        });
    };

    return {
        ...loginStore,
        updateEmail,
        validateEmail,
        updatePassword,
        validatePassword
    };
}
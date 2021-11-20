import {UPDATE_EMAIL, UPDATE_PASSWORD} from './loginActions';

export const INITIAL_VALUES = {
    email: {
        isValid: false,
        value: '',
        touched: false
    },
    password: {
        isValid: false,
        value: '',
        touched: false
    }
};

export function LoginReducer(state = INITIAL_VALUES, action) {
    switch (action.type) {
        case UPDATE_EMAIL: return {
            ...state, email: { ...action.payload }
        };
        case UPDATE_PASSWORD: return {
            ...state, password: { ...action.payload }
        };
        default: return state;
    }
}
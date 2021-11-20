import { useReducer } from 'react';
import GlobalReducer, { INITIAL_GLOBAL_STATE } from './GlobalReducer';
import { LOGIN_USER, LOGOUT_USER } from './GlobalActions';
import useMeeting from './useMeeting';

export default function useGlobalStore() {
    const [globalState, dispatch] = useReducer(GlobalReducer, INITIAL_GLOBAL_STATE);
    const meetings = useMeeting(globalState.currentMeetingData, dispatch);

    const signUserIn = user => {
        dispatch({
            type: LOGIN_USER,
            payload: {user}
        });
    };

    return {
        globalState,
        signUserIn,
        ...meetings
    };
}
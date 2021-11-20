import { LOGOUT_USER, UPDATE_NAME, UPDATE_DATE, UPDATE_DESCRIPTION, ADD_ATTENDEE, DELETE_ATTENDEE, UPDATE_MEETING, RESET_MEETING, SAVE_UPDATED_MEETING, SCHEDULE_MEETING } from './GlobalActions';

export default function useMeeting(currentMeetingData, dispatch) {
    const updateName = (name) => {
        dispatch({
            type: UPDATE_NAME,
            payload: {
                name: {
                    value: name,
                    touched: true,
                    isValid: true
                }
            }
        });
    };

    const logout = () => {
        dispatch({
            type: LOGOUT_USER
        });
    };

    const validateName = () => {
        dispatch({
            type: UPDATE_NAME,
            payload: {
                name: {
                    value: currentMeetingData.name.value,
                    touched: true,
                    isValid: Boolean(currentMeetingData.name.value)
                }
            }
        });
    };

    const updateDate = (date) => {
        dispatch({
            type: UPDATE_DATE,
            payload: {
                date: {
                    value: Array.from(date).filter(char => (char >= '0' && char <= '9') || char === '-').join(''),
                    touched: true,
                    isValid: true
                }
            }
        });
    };

    const validateDate = () => {
        let [date, month, year] = currentMeetingData.date.value.split('-');

        if(date === '' || month === '' || year===''){
            dispatch({
                type: UPDATE_DATE,
                payload: {
                    date: {
                        value:  currentMeetingData.date.value,
                        touched: true,
                        isValid: false
                    }
                }
            });
        }else{
            date = Number(date);
            month = Number(month);
            year = Number(year);
            const dt = new Date();
            const currentYear = dt.getFullYear();
            const currentMonth = dt.getMonth() + 1;

            dispatch({
                type: UPDATE_DATE,
                payload: {
                    date: {
                        value:  currentMeetingData.date.value,
                        touched: true,
                        isValid: (date<=30 && date >= 1) && month===currentMonth && year===currentYear
                    }
                }
            });
        }
    };


    const updateDescription = (description) => {
        dispatch({
            type: UPDATE_DESCRIPTION,
            payload: {
                description: {
                    value: description,
                    touched: true,
                    isValid: true
                }
            }
        });
    };

    const addAttendee = (attendee) => {
        dispatch({
            type: ADD_ATTENDEE,
            payload: {
                attendee
            }
        });
    };

    const deleteAttendee = (attendee) => {
        dispatch({
            type: DELETE_ATTENDEE,
            payload: {
                attendee
            }
        });
    };

    const updateMeeting = (meeting) => {
        dispatch({
            type: UPDATE_MEETING,
            payload: {
                 meeting
            }
        });
    };

    const saveUpdatedMeeting = (meeting) => {
        dispatch({
            type: SAVE_UPDATED_MEETING,
            payload: {
                 meeting
            }
        });
    };

    const scheduleMeeting = (meeting) => {
        dispatch({
            type: SCHEDULE_MEETING,
            payload: {
                 meeting
            }
        });
    };

    const resetMeetingDate = () => {
        dispatch({
            type: RESET_MEETING
        });
    };

    return {
        updateName,
        updateDate,
        updateDescription,
        addAttendee,
        validateName,
        validateDate,
        deleteAttendee,
        saveUpdatedMeeting,
        updateMeeting,
        resetMeetingDate,
        scheduleMeeting,
        logout
    };
}
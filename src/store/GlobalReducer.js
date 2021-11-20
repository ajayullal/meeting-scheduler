import { LOGIN_USER, LOGOUT_USER, UPDATE_NAME, UPDATE_DATE, UPDATE_DESCRIPTION, ADD_ATTENDEE, DELETE_ATTENDEE, UPDATE_MEETING, RESET_MEETING, SAVE_UPDATED_MEETING, SCHEDULE_MEETING } from './GlobalActions';

export const INITIAL_GLOBAL_STATE = {
    isLoggedIn: false,
    meetings: [],
    user: null,
    isReschedule: false,
    currentMeetingData: {
        id: Date.now(),
        name: {
            value: '',
            touched: false,
            isValid: false
        },
        date: {
            value: '',
            touched: false,
            isValid: false
        },
        description: {
            value: '',
            touched: false,
            isValid: false
        },
        attendees: []
    }
};

export default function GlobalReducer(state, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, isLoggedIn: true, user: { ...action.payload.user } };
        case LOGOUT_USER:
            return { ...state, isLoggedIn: false };
        // Schedule Meetings    
        case UPDATE_NAME:
        case UPDATE_DATE:
        case UPDATE_DESCRIPTION: return { ...state, currentMeetingData: { ...state.currentMeetingData, ...action.payload } };
        case UPDATE_MEETING:
            return {
                ...state, isReschedule: true, currentMeetingData: {
                    id: action.payload.meeting.id,
                    name: {
                        value: action.payload.meeting.name,
                        touched: true,
                        isValid: true
                    }, date: {
                        value: action.payload.meeting.date,
                        touched: true,
                        isValid: true
                    }, description: {
                        value: action.payload.meeting.description,
                        touched: true,
                        isValid: true
                    }, attendees: [...action.payload.meeting.attendees]
                }
            };
        case SCHEDULE_MEETING:
            return {
                ...state, user: {
                    ...state.user, meetings: [...state.user.meetings, {
                        ...action.payload.meeting
                    }]
                }, isReschedule: false, currentMeetingData: { ...INITIAL_GLOBAL_STATE.currentMeetingData }
            };
        case SAVE_UPDATED_MEETING:
            const updatedMeetingId = state.user.meetings.findIndex(meeting => meeting.id === action.payload.meeting.id);
            state.user.meetings.splice(updatedMeetingId, 1, {
                ...action.payload.meeting
            });
            return {
                ...state, user: {
                    ...state.user, meetings: [...state.user.meetings]
                }, isReschedule: false, currentMeetingData: { ...INITIAL_GLOBAL_STATE.currentMeetingData }
            };
        case RESET_MEETING: return { ...state, isReschedule: false, currentMeetingData: { ...INITIAL_GLOBAL_STATE.currentMeetingData } };
        case ADD_ATTENDEE: return {
            ...state, currentMeetingData: {
                ...state.currentMeetingData,
                attendees: [...state.currentMeetingData.attendees, action.payload.attendee]
            }
        };
        case DELETE_ATTENDEE: return {
            ...state, currentMeetingData: {
                ...state.currentMeetingData,
                attendees: [...state.currentMeetingData.attendees.filter(attendee => attendee !== action.payload.attendee)]
            }
        };
        default:
            return state;
    }
}
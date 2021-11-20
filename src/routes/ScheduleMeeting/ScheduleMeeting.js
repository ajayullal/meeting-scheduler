import { useContext, useState, useEffect } from 'react';
import classes from './ScheduleMeeting.module.css';
import withAppShell from '../../HOC/withAppShell';
import { Input, Button, Checkbox } from '../../components';
import { GlobalContext } from '../../store/GlobalStore';
import useFieldValidations from '../Login/useFieldValidations';
import { useNavigate } from 'react-router-dom';

function ScheduleMeeting() {
    const navigate = useNavigate();
    const { isValidEmail } = useFieldValidations();
    const [isLoading, setIsLoading] = useState(false);
    const [attendeeEmail, setAttendeeEmail] = useState('');
    const [attendeeEmailValid, setAttendeeEmailValid] = useState(true);
    const [attendeeEmailTouched, setAttendeeEmailTouched] = useState(false);
    const global = useContext(GlobalContext);
    const { globalState, updateName, validateName, updateDate, validateDate, updateDescription, addAttendee, deleteAttendee, scheduleMeeting, resetMeetingDate, saveUpdatedMeeting } = global;
    const { currentMeetingData, isReschedule, user } = globalState;
    const { date, name, description, attendees } = currentMeetingData;

    useEffect(() => {
        document.title = isReschedule ? 'Update meeting | Meeting Scheduler' : 'Schedule details | Meeting Scheduler';
    }, [isReschedule]);

    useEffect(() => resetMeetingDate, []);

    useEffect(() => {
        if (!globalState.isLoggedIn) {
            navigate('/login');
        }
    }, [globalState.isLoggedIn]);

    const onAttendeeEmailBlur = () => {
        setAttendeeEmailTouched(true)
        setAttendeeEmailValid(isValidEmail(attendeeEmail));
    };

    const addNedAttendee = () => {
        addAttendee({
            id: Date.now(),
            email: attendeeEmail
        });

        setAttendeeEmail('');
        setAttendeeEmailValid(true);
        setAttendeeEmailTouched(false);
    };

    const saveChanges = () => {
        const payload = {
            email: user.email,
            meeting: {
                id: currentMeetingData.id,
                name: name.value,
                date: date.value,
                description: description.value,
                attendees: [...currentMeetingData.attendees]
            }
        };

        if (!isReschedule) {
            payload.meeting.id = Date.now();
        }

        setIsLoading(true);

        fetch(`http://localhost:5002/${isReschedule ? 'update-meeting' : 'schedule-meeting'}`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            }
        }).then(response => {
            if (isReschedule) {
                saveUpdatedMeeting(payload.meeting);
                // This is to display the alert after navigation
                setTimeout(() => alert("Meeting details were updated successfully"));
            } else {
                scheduleMeeting(payload.meeting);
                setTimeout(() => alert("Meeting has been created successfully"));
            }

            navigate('/dashboard');
        }).catch(err => {
            alert("Error");
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div>
            <h1>{isReschedule ? 'Update' : 'Schedule'} Meeting</h1>

            <div>
                <Input
                    onBlur={validateDate}
                    onChange={e => updateDate(e.target.value)}
                    type="text"
                    placeholder="Enter the date of the meeting in DD-MM-YYY format"
                    errorMessage={`Please enter a valid date between 1-11-2021 and 30-11-2021`}
                    isInValid={date.touched && !date.isValid }
                    value={date.value}
                ></Input>

                <Input
                    className={classes.name}
                    onBlur={validateName}
                    onChange={e => updateName(e.target.value)}
                    type="text"
                    placeholder="Enter the name of the meeting"
                    errorMessage={"Please enter the name of the meeting"}
                    isInValid={name.touched && !name.isValid }
                    value={name.value}
                ></Input>

                <Input
                    className={classes.description}
                    onChange={e => updateDescription(e.target.value)}
                    type="text"
                    placeholder="Enter the description of the meeting"
                    errorMessage={"Please the description of the meeting"}
                    isInValid={description.touched && !description.isValid }
                    value={description.value}
                ></Input>
            </div>

            <div className={classes.attendeesCntr}>
                <h2 className={classes.attendeesHeader}>Attendees</h2>

                <div className={classes.attendeeDetailsCntr}>
                    <Input
                        onBlur={onAttendeeEmailBlur}
                        onChange={e => {
                            setAttendeeEmail(e.target.value);
                            attendeeEmailTouched && onAttendeeEmailBlur();
                        }}
                        type="text"
                        placeholder="Enter attendee email"
                        errorMessage={"Please enter the email address of the attendee"}
                        isInValid={attendeeEmailTouched && !attendeeEmailValid}
                        value={attendeeEmail}
                    ></Input>

                    <Button disabled={!isValidEmail(attendeeEmail)} onClick={addNedAttendee} className={classes.addAttendeeBtn}>Add Attendee</Button>
                </div>

                <div className={classes.attendeesListCntr}>
                    {
                        attendees.length > 0 ? <h3>Attendees List</h3> : null
                    }

                    {
                        attendees.map(attendee => {
                            return <span key={attendee.id} className={classes.attendeeListItem}>{attendee.email} <span onClick={() => deleteAttendee(attendee)} className={classes.cancel}>X</span></span>
                        })
                    }
                </div>
            </div>

            <Button disabled={isLoading || (!date.isValid || !name.isValid || !attendees.length)} className={classes.scheduleMeeting} onClick={saveChanges}>{isReschedule ? 'Update' : 'Schedule'} Meeting</Button>
        </div>
    );
}

export default withAppShell(ScheduleMeeting);
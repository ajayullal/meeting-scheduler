
import { useRef, useEffect, useState } from 'react';
import classes from './Dashboard.module.css';
import withAppShell from '../../HOC/withAppShell';
import { useContext } from 'react';
import { GlobalContext } from '../../store/GlobalStore';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../components';

function Dashboard() {
    const { globalState, updateMeeting } = useContext(GlobalContext);
    const { user } = globalState;
    const clickRef = useRef({ count: 0 });
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(false);

    useEffect(() => {
        document.title = 'Dashboard | Meeting Scheduler';
    }, []);

    useEffect(() => {
        if (!globalState.isLoggedIn) {
            navigate('/login');
        }
    }, [globalState.isLoggedIn]);

    const hasMeeting = (date) => {
        return !!user?.meetings.some(meeting => date === Number(meeting.date.split('-')[0]));
    };

    const getMeeting = (date) => {
        return user?.meetings.find(meeting => date === Number(meeting.date.split('-')[0]));
    };

    const handleItemClick = (meeting) => {
        clickRef.current.count++;

        if (clickRef.current.count === 2) {
            clickRef.current.count = 0;
            clearTimeout(clickRef.current.timeOutRef);
            updateMeeting(meeting);
            navigate('/schedule-meeting');
        } else {
            clickRef.current.timeOutRef = setTimeout(() => {
                clickRef.current.count = 0;
                setSelectedMeeting(meeting);
                setModalOpen(true);
            }, 300);
        }
    };

    const attachClickListeners = (item, date) => {
        if (item && hasMeeting(date)) {
            item.onclick = handleItemClick.bind(this, getMeeting(date));
        }
    };

    return (
        <>
            {isModalOpen ? <Modal meetingDetails={selectedMeeting} onClose={() => setModalOpen(false)}></Modal> : null}
            <h1>Dashboard</h1>

            <div className={classes.calendarContainer}>
                <div className={[classes.month, classes.borderBottom].join(' ')}>November 2021</div>

                <div className={[classes.rowContainer, classes.borderBottom].join(' ')}>
                    <div className={classes.rowItem}>Sun</div>
                    <div className={classes.rowItem}>Mon</div>
                    <div className={classes.rowItem}>Tue</div>
                    <div className={classes.rowItem}>Wed</div>
                    <div className={classes.rowItem}>Thu</div>
                    <div className={classes.rowItem}>Fri</div>
                    <div className={classes.rowItem}>Sat</div>
                </div>

                <div className={classes.rowContainer}>
                    <div className={[classes.rowItem, classes.weekend].join(' ')}>Oct 31</div>
                    {
                        Array(30).fill('', 0, 30).map((s, index) => {
                            return (<div key={index + 1} ref={item => attachClickListeners(item, index + 1)} className={[classes.currentMonthDay, classes.rowItem, ((index + 1) % 7 === 0) || ((index + 1) % 7 === 6) ? classes.weekend : ''].join(' ')}>
                                <span>{index + 1}</span>
                                {hasMeeting(index + 1) ? <span className={classes.blueDot}></span> : null}
                            </div>)
                        })
                    }

                    {
                        Array(4).fill('', 0, 4).map((s, index) => {
                            return <div key={index + 1} className={[classes.rowItem, index === 3 ? classes.weekend : ''].join(' ')}>{index === 0 && 'Dec'} {index + 1}</div>
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default withAppShell(Dashboard);
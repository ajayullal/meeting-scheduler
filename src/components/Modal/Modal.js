import classes from './Modal.module.css';

export default function Modal({ onClose, meetingDetails }) {
    return (
        <div onClick={onClose} className={classes.backdrop}>
            <div onClick={e => {
                e.preventDefault();
                e.stopPropagation();
            }} className={classes.modalContainer}>
                <div className={classes.modalTitleContainer}>
                    <h1 className={classes.modalTitle}>Meeting Details</h1>
                    <span onClick={onClose} className={classes.close}>X</span>
                </div>

                <div className={classes.meetingDetailsContainer}>
                    <span className={classes.meetingDetailsCell}>Name</span>
                    <span className={classes.meetingDetailsCell}>{meetingDetails.name}</span>

                    <span className={classes.meetingDetailsCell}>Date</span>
                    <span className={classes.meetingDetailsCell}>{meetingDetails.date}</span>

                    {
                        meetingDetails.description ? (<><span className={classes.meetingDetailsCell}>Description</span>
                            <span className={classes.meetingDetailsCell}>{meetingDetails.description}</span></>) : null
                    }


                    <span className={classes.meetingDetailsCell}>Attendees</span>
                    <span className={[classes.meetingDetailsCell, classes.attendees].join(' ')}>
                        {meetingDetails.attendees.map(attendee => {
                            return <span key={attendee.id}>{attendee.email}</span>
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}
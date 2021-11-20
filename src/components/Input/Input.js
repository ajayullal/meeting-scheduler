import './Input.module.css';

import classes from './Input.module.css';

export default function Input(props) {
    const { type, placeholder, className, errorMessage, isInValid } = props;

    return (
        <div className={classes.inputContainer}>
            <input {...props} className={[className, classes.input, isInValid ? classes['error-border'] : ''].join(' ')} type={type} placeholder={placeholder} />
            {isInValid && (<span className={classes.error}>{errorMessage}</span>)}
        </div>
    );
}
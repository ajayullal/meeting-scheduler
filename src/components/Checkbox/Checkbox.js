import classes from './Checkbox.module.css';

export default function Checkbox(props) {
    const {label, id, className} = props;

    return (
        <div className={className}>
            <input id={id} type="checkbox" {...props} />
            <label className={classes.label} htmlFor={id}>{label}</label>
        </div>
    );
}
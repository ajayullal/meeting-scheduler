import classes from './Button.module.css';

export default function Button(props){
    const {children, className} = props;

    return (
        <button {...props} className={[className, classes.button].join(' ')}>{children}</button>
    );
}
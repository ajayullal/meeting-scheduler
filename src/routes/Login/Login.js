import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../store/GlobalStore';
import { useLogin } from './useLogin';
import classes from './Login.module.css';
import { Input, Button } from '../../components';
import { useNavigate } from 'react-router-dom';

document.title = 'Login';

export default function Login() {
    const { email, updateEmail, validateEmail, password, updatePassword, validatePassword } = useLogin();
    const { globalState, signUserIn } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (globalState.isLoggedIn) {
            navigate('/dashboard');
        }
    }, [globalState]);

    useEffect(() => {
        document.title = 'Login | Meeting Scheduler';
    }, []);

    const signIn = () => {
        validateEmail();
        validatePassword();

        if (email.isValid && password.isValid) {
            setIsLoading(true);
            fetch('http://localhost:5002/login', {
                method: 'POST',
                body: JSON.stringify({ email: email.value, password: password.value }),
                headers: {
                    'Content-Type': 'application/json',
                    'charset': 'utf-8'
                }
            }).then(response => {
                response.json().then(data => {
                    if (data.success) {
                        signUserIn(data.user);
                        navigate('/dashboard');
                    } else {
                        alert("Invalid email and password!");
                    }
                });
            }).catch(err => {
                console.error(err);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.loginFormContainer}>
                <h1 className={classes.heading}>Login </h1>
                <Input errorMessage={"Please enter a valid email address"} onBlur={validateEmail} isInValid={email.touched && !email.isValid} onChange={e => updateEmail(e.target.value)} value={email.value} type="text" placeholder="Email or username"></Input>
                <Input errorMessage={"Please enter your password"} onBlur={validatePassword} isInValid={password.touched && !password.isValid} onChange={e => updatePassword(e.target.value)} value={password.value} className={classes.passwordField} type="password" placeholder="Password"></Input>
                <Button disabled={isLoading} onClick={signIn} className={classes.signInButton}>Login</Button>
            </div>
        </div>
    );
}
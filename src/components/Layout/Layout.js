import { useContext } from 'react';
import classes from './Layout.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../store/GlobalStore';

function Layout({ children, path }) {
    const { pathname } = useLocation();
    const isDashboardActive = pathname === '/dashboard';
    const isScheduledMeetingActive = pathname === '/schedule-meeting';
    const { logout } = useContext(GlobalContext);
    const navigate = useNavigate();

    const _logout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={classes.layoutContainer}>
            <div className={classes.header}></div>
            <div className={classes.contentContainer}>
                <aside className={classes.nav}>
                    <ul className={classes.navMenu}>
                        <li className={[classes.navItem, isDashboardActive ? classes.navItemActive : ''].join(' ')}>
                            <NavLink
                                className={classes.navLink}
                                to="/dashboard">
                                Dashboard
                            </NavLink>
                        </li>

                        <li className={[classes.navItem, isScheduledMeetingActive ? classes.navItemActive : ''].join(' ')}>
                            <NavLink
                                className={classes.navLink}
                                to="/schedule-meeting">
                                Schedule Meeting
                            </NavLink>
                        </li>

                        <li onClick={_logout} className={[classes.navItem, classes.navLink].join(' ')}>
                           Logout
                        </li>
                    </ul>
                </aside>
                <main className={classes.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
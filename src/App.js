import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import {
    Dashboard,
    Login,
    ScheduleMeeting,
    Redirect
} from './routes';

import GlobalStoreProvider from './store/GlobalStore';

export default function App() {
    return (
        <GlobalStoreProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login></Login>} />
                    <Route path="/dashboard" element={<Dashboard></Dashboard>} />
                    <Route path="/schedule-meeting" element={<ScheduleMeeting></ScheduleMeeting>} />
                    <Route path="*" element={<Login></Login>} />
                </Routes>
            </Router>
        </GlobalStoreProvider>
    );
}
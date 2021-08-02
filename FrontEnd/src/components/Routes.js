import React, { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import AdminPage from '../pages/AdminPage/AdminPage'
import AddAdmin from '../pages/AddAdmin/AddAdmin'
import EditAdmin from '../pages/EditAdmin/EditAdmin'
import HomePage from '../pages/HomePage/HomePage'
import ClassPage from '../pages/ClassPage/ClassPage'
import AddClass from '../pages/AddClass/AddClass'
import EditClass from '../pages/EditClass/EditClass';
import SectionPage from '../components/SectionPage/sectionPage';
import AddSection from '../pages/AddSection/AddSection';
import EditSection from '../pages/EditSection/EditSection'
import Attendance from '../pages/Attendance/Attendance';
import AttendanceView from '../pages/AttendanceView/AttendanceView';
import StudentPage from '../pages/StudentPage/StudentPage';
import EditStudent from '../pages/EditStudent/EditStudent'
import AddStudent from '../pages/AddStudent/AddStudent'
import Report from '../pages/Report/Report'
import StudentProfile from '../pages/StudentProfile/StudentProfile'
import LogIN from '../pages/LogIn/LogIn'
import About from '../pages/About/About'

import SessionContext from './session/SessionContext';

export default function Routes() {

    let { state: { user } } = useContext(SessionContext);

    return (
        <div>
            <Switch>

                <Route exact path="/" render={props => user.token ?
                    <Redirect {...props} to="/HomePage" /> :
                    <LogIN {...props} />
                } />

                <Route exact path="/HomePage" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <HomePage {...props} />
                } />

                <Route exact path="/adminpage" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <AdminPage {...props} />
                } />


                <Route exact path="/addadmin" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <AddAdmin {...props} />
                } />

        <Route exact path="/editadmin/:id" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <EditAdmin {...props} />
                } />
        
                <Route exact path="/classpage" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <ClassPage {...props} />
                } />

<Route exact path="/addclass" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <AddClass {...props} />
                } />

<Route exact path="/editclass/:id" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <EditClass {...props} />
                } />
<Route exact path="/sectionpage" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <SectionPage {...props} />
                } />

<Route exact path="/addsection" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <AddSection {...props} />
                } />   


<Route exact path="/editsection/:id" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <EditSection {...props} />
                } /> 


<Route exact path="/attendance" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <Attendance {...props} />
                } /> 


<Route exact path="/attendanceview" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <AttendanceView {...props} />
                } /> 


<Route exact path="/StudentPage" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <StudentPage {...props} />
                } /> 

<Route exact path="/EditStudent/:id" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <EditStudent {...props} />
                } /> 

<Route exact path="/addstudent" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <AddStudent {...props} />
                } /> 

<Route exact path="/report" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <Report {...props} />
                } /> 

<Route exact path="/StudentProfile/:id" render={props => !user.token ?
                    <Redirect {...props} to="/" /> :
                    <StudentProfile {...props} />
                } /> 
                <Route exact path="/About" render={props =>!user.token ?
                <Redirect {...props} to="/"/>:
                <About {...props}/>
            } />

            </Switch>

        </div>
    );
}
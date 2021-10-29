import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  // Redirect,
  Route
} from "react-router-dom";
import './CSS/style.css'
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import BreadCrumb from './Components/BreadCrumb';
import Profile from './Components/Profile/Profile';
import MyTasks from './Components/MyTasks/MyTasks';
import Completed from './Components/MyTasks/Completed';
import Messages from './Components/Messages/Messages';
import Chat from './Components/Messages/Chat';

import Announcements from './Components/Personal/Announcements';
import AdministrativeStaff from './Components/Personal/AdministrativeStaff';
import AttendanceMap from './Components/Study/AttendanceMap';
import Exams from './Components/Study/Exams';
import ExamStart from './Components/Study/ExamStart';
import TestStart from './Components/Study/TestStart';
import Test from './Components/Study/Test';
import Lessons from './Components/Study/Lessons';
import ApplyToCourse from './Components/Study/ApplyToCourse';
import TestResults from './Components/Study/TestResults';
import ExamResults from './Components/Study/ExamResults';

import Audio from './Components/Stuff/Audio';
import Books from './Components/Stuff/Books';
import Slides from './Components/Stuff/Slides';
import Video from './Components/Stuff/Video';

import NotFound from './NotFound';

import Notifications from './Components/Notifications';


import Footer from './Components/Footer';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';


class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        {/* <Preloader /> */}
        
        
        
        <Router>
        {/* <Redirect from="/Login" to="/" /> */}
        <Header />
        
          <Sidebar />
            <div className="content-wrapper">
                <BreadCrumb />
                <section className="content">
                    <div className="container-fluid">
                            <Switch>
                                <Route path={`/`} exact>
                                  <MyTasks />
                                </Route>
                                <Route path={`/TasksActual`}>
                                  <MyTasks />
                                </Route>
                                <Route path={`/TasksCompleted`}>
                                  <Completed />
                                </Route>
                                <Route path={`/Messages`} component={Messages} exact />
                                <Route path={`/Messages/Chat/:id`} component={Chat} />
                                <Route path={`/Profile`} component={Profile} />
                                <Route path={`/Announcements`} component={Announcements} />
                                <Route path={`/AdministrativeStaff`} component={AdministrativeStaff} />
                                <Route path={`/AttendanceMap`} component={AttendanceMap} />
                                <Route path={`/Lessons`} component={Lessons} />
                                <Route path={`/TestResults`} component={TestResults} />
                                <Route path={`/ExamResults`} component={ExamResults} />
                                <Route path={`/Exams`} component={Exams} />
                                <Route path={`/ExamStart/:id`} component={ExamStart} />
                                <Route path={`/TestStart/:id`} component={TestStart} />
                                <Route path={`/Tests`} component={Test} />
                                <Route path={`/ApplyToCourse`} component={ApplyToCourse} />
                                <Route path={`/Slides`} component={Slides} />
                                <Route path={`/Books`} component={Books} />
                                <Route path={`/Audio`} component={Audio} />
                                <Route path={`/Video`} component={Video} />
                                <Route path={`/Notifications`} component={Notifications} />
                                <Route component={NotFound} />
                            </Switch>
                    </div>
                </section>
            </div>
        </Router>
        <Footer />
      </div>
    );
    
  }
}

export default App;


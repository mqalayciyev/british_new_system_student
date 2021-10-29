import React, { useState, useEffect } from 'react';
import img from '../img/profile.jpg';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

function Sidebar(params) {

    const location = useLocation();

    const { pathname } = location;

    let student = JSON.parse(localStorage.getItem('student'));

    const splitLocation = pathname.split("/");





    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">

            <div className="sidebar" style={{ overflowY: 'auto' }}>
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={student.user.user_info.image ?  process.env.REACT_APP_URL + '/' + student.user.user_info.image : img} className="img-circle elevation-2" alt="user" />
                        {/* <img src="{user2}" className="img-circle elevation-2" alt="user" /> */}
                    </div>
                    <div className="info">
                        <Link to="/Profile" className="d-block">{`${student.user.user_info.first_name} ${student.user.user_info.last_name}`}</Link>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <Link to="/" className={splitLocation[1] === "" || splitLocation[1] === 'TasksCompleted' || splitLocation[1] === 'TasksActual' ? "nav-link active" : "nav-link"}>
                                <i className="nav-icon fa fa-list-alt"></i>
                                <p> My tasks </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Messages" className={splitLocation[1] === "Messages" ? "nav-link active" : "nav-link"}>
                                <i className="nav-icon far fa-envelope"></i>
                                <p>
                                    Messages
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">
                                <i className="nav-icon far fa-user-circle"></i>
                                <p>
                                    Personal
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>

                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/Announcements" className={splitLocation[1] === "Announcements" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Announcements</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/AdministrativeStaff" className={splitLocation[1] === "AdministrativeStaff" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Administrative Staff</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">
                                <i className="nav-icon far fa-file-alt"></i>
                                <p>
                                    Study
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>

                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/AttendanceMap" className={splitLocation[1] === "AttendanceMap" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Attendance map</p>
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="/Schedule" className={splitLocation[1] === "Schedule" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Schedule </p>
                                    </Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link to="/Lessons" className={splitLocation[1] === "Lessons" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Lessons</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/TestResults" className={splitLocation[1] === "TestResults" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Test results</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/ExamResults" className={splitLocation[1] === "ExamResults" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Exam results</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Exams" className={splitLocation[1] === "Exams" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Exams</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Tests" className={splitLocation[1] === "Tests" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Tests</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/ApplyToCourse" className={splitLocation[1] === "ApplyToCourse" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Apply to course</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">
                                <i className="nav-icon far fa-folder-open"></i>
                                <p>
                                    My stuff
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>

                            <ul className="nav nav-treeview open">
                                <li className="nav-item">
                                    <Link to="/Slides" className={splitLocation[1] === "Slides" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Slides</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Books" className={splitLocation[1] === "Books" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Books</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Audio" className={splitLocation[1] === "Audio" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Audio</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Video" className={splitLocation[1] === "Video" ? "nav-link active" : "nav-link"}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Video</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/Notifications" className={splitLocation[1] === "Notifications" ? "nav-link active" : "nav-link"}> 
                                <i className="nav-icon far fa-bell"></i>
                                <p>
                                Notifications
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;
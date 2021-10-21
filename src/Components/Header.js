import React, { Component } from 'react';
import { Navbar,  Nav, Dropdown } from 'react-bootstrap';
// import user1 from 'admin-lte/dist/img/user1-128x128.jpg'
// import user8 from 'admin-lte/dist/img/user8-128x128.jpg'
// import user3 from 'admin-lte/dist/img/user3-128x128.jpg'
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { SessionContext } from "../Context/Session";
import createHistory from 'history/createBrowserHistory'
// import user2 from 'admin-lte/dist/img/user2-160x160.jpg'


export default class Header extends Component {
    static contextType = SessionContext;
    constructor(props) {
        super(props)
        this.history = createHistory()
    }
    logout = async () => {

        let student = JSON.parse(localStorage.getItem('student'))
        console.log(student.user)
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${student.user.token}`;
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )

        let response = await axios.post(`http://127.0.0.1:8000/api/logout`)
        if (response.data.status === 'sign_out') {
            localStorage.removeItem('student')
            this.context.setSession(response.status, '')
            window.location.href = '/'
        }
        else {
            NotificationManager.error('The operation failed.', 'Error', 5000);
        }

    }
    render() {
        return (
            <>
                <NotificationContainer />
                <Navbar bg="white" className="main-header navbar navbar-expand navbar-white navbar-light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link to="#" role="button" data-widget="pushmenu">
                                <i className="fas fa-bars"></i>
                            </Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">

                            <Dropdown>
                                <Dropdown.Toggle variant="none" id="dropdown-basic">
                                    <i className="far fa-bell"></i>
                                    <span className="badge badge-warning navbar-badge">15</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu-lg">
                                    <span className="dropdown-header">15 Notifications</span>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item href="#/action-1">
                                        <i className="fas fa-envelope mr-2"></i> 4 new messages
                                        <span className="float-right text-muted text-sm">3 mins</span>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item href="#/action-2">
                                        <i className="fas fa-users mr-2"></i> 8 friend requests
                                        <span className="float-right text-muted text-sm">12 hours</span>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item href="#/action-3">
                                        <i className="fas fa-file mr-2"></i> 3 new reports
                                        <span className="float-right text-muted text-sm">2 days</span>
                                    </Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item href="#/action-3" className="dropdown-footer">See All Notifications</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Nav.Link to="#" onClick={() => this.logout()}>
                                Sign out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}

import React from 'react';
import { NavLink  } from "react-router-dom";
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Completed extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            display: true
        }
    }
    componentDidMount = () => {
        this.load()
    }
    load = async name => {
        let student = JSON.parse(localStorage.getItem('student'))
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${student.user.token}`;
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
        let response = await axios.post(`${process.env.REACT_APP_API_URL}/students/tasks/completed`)
        
        if (response.data.status === 'success') {
            this.setState({
                tasks: response.data.tasks,
                display: false
            })
        }
    }
    delete = async value => {
        let student = JSON.parse(localStorage.getItem('student'))
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${student.user.token}`;
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
        let response = await axios.delete(`${process.env.REACT_APP_API_URL}/students/tasks/${value.id}`)
        
        if (response.data.status === 'success') {
            NotificationManager.warning('Task silindi', 'Warning', 5000);
            this.load()
        }
    }
	render() {
		const priority = ['Low', 'Middle', 'High']
		return (
			<>
            <NotificationContainer />

			<div className="row">
				<div className="col-12">
					<div className="row">
						<div className="col-12">
							<h4>My Tasks</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<NavLink to="/TasksActual" className="btn btn-info mr-2">Actual</NavLink>
							<NavLink to="/TasksCompleted" className={(this.props.page === 'cempleted') ? 'btn btn-info active' : 'btn btn-info'} >Completed</NavLink>
						</div>
						<div className="col-6" align='right'>
							{/* <NavLink to="/SchedulingCalendar" className="btn btn-info mx-2">Calendar</NavLink> */}
							{/* <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" onClick={() => this.addComponent()}>Add task</button> */}
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-12">
                        <div className="loading" style={{ display: this.state.display ? 'block' : 'none' }}>
                                <div className="text-center">
                                    <span>
                                        Loading...
                                    </span>
                                </div>
                            </div>
							<div className="table-responsive bg-white m-0 p-3 rounded shadow">
								<table className="table table-bordered m-0">
									<thead>
										<tr>
											<th scope="col">Execution date</th>
											<th scope="col">Description</th>
											<th scope="col">Client</th>
											<th scope="col">Client Contact</th>
											<th scope="col">Purpose</th>
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody>
									{this.state.tasks.length > 0 ? this.state.tasks.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
															Start: 
                                                            <p className="text-success">{value.start_date}, {value.start_time}</p>
															End: 
                                                            <p className="text-danger">{value.end_date}, {value.end_time}</p>
                                                        </td>
                                                        <td>
                                                            <p>Prioirty: {priority[value.priority]}</p>
                                                            {value.note}
                                                        </td>
                                                        <td>
                                                            {value.client}
                                                        </td>
                                                        <td>
                                                            <p>{value.mobile}</p>
                                                            <p>{value.email}</p>
                                                        </td>
                                                        <td>
                                                        {value.purpose}
                                                        </td>
                                                        <td className="btnTD text-center">
															{/* <button className="btn Btn32 btn-success"><i className="far fa-thumbs-up"></i></button> */}
															{/* <button className="btn Btn32 btn-warning" data-toggle="modal" data-target="#exampleModal" onClick={() => this.addComponent(value)}><i className="fas fa-pencil-alt"></i></button> */}
															{/* <button className="btn Btn32 btn-info"><i className="fas fa-eye"></i></button> */}
                                                            <button className="btn Btn32 btn-danger" onClick={() => this.delete(value)}><i className="fas fa-trash"></i></button>

                                                        </td>
                                                    </tr>
                                                )
                                            }) :
                                                <tr>
                                                    <td colSpan="12" className="text-center">
                                                        Empty
                                                        </td>
                                                </tr>
                                            }
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			</>
		);

	}
}

export default Completed;
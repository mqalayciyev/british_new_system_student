import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import img from '../../img/profile.jpg';
export default class AdministrativeStaff extends Component {
    constructor(props) {
        super(props)
        this.state = {
            managers: [],
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
        let response = await axios.get(`http://127.0.0.1:8000/api/students/manager`)
        if (response.data.status === 'success') {
            this.setState({
                managers: response.data.managers
            })
        }
    }
    render() {
        const role = ['', 'Manager', 'Teacher', 'Student', 'Coordinator']
        const status = ['Resigned', 'Works', 'Intern', 'On Holiday']
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h4>Adminitrative staff</h4>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <div className="table-responsive bg-white m-0 p-3 rounded shadow">
                                    <table class="table table-bordered m-0">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Full name</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Officess</th>
                                                <th scope="col">Status</th>
                                                {/* <th scope="col">Contacts</th> */}
                                                <th scope="col"></th>
                                                {/* <th scope="col"><button className="btn Btn32 text-danger"><i class="fas fa-trash"></i></button></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.managers.length > 0 ? this.state.managers.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img className="rounded-circle h-100 w-100" style={{ maxWidth: '100px', maxHeight: '100px' }} src={value.image ? value.image : img} alt='account' />
                                                        </td>
                                                        <td>
                                                            {value.first_name} {value.last_name}
                                                        </td>
                                                        <td>
                                                            {role[value.type]}
                                                        </td>
                                                        <td>
                                                            {value.name}
                                                        </td>
                                                        <td>
                                                            {status[value.status]}
                                                        </td>
                                                        {/* <td>
                                                            <p className="m-0 p-0">{value.mobile}</p>
                                                            <p className="m-0 p-0">{value.phone}</p>
                                                            <p className="m-0 p-0">{value.email}</p>
                                                            <p className="m-0 p-0"><i>{value.address}</i></p>
                                                        </td> */}
                                                        <td className="btnTD text-center">
                                                            <Link to={`/Messages/Chat/${value.id}`} className="btn Btn32 btn-success mx-1"><i class="fas fa-comment"></i></Link>
                                                            {/* <button className="btn Btn32 btn-warning mx-1" data-toggle="modal" data-target="#exampleModal" onClick={() => this.addComponent(value)}><i class="fas fa-pencil-alt"></i></button> */}
                                                            {/* <button className="btn Btn32 btn-info"><i class="far fa-eye"></i></button> */}

                                                            {/* <button className="btn Btn32 btn-danger" data-id={value.id} data-link="lesson" onClick={this.delete}><i class="fas fa-trash"></i></button> */}

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
        )
    }
}

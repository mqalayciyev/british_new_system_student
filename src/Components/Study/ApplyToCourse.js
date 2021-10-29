import React, { Component } from 'react'
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class ApplyToCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            data: {},
            display: true
        };
    }
    componentDidMount = () => {
        this.load();
    }
    load = async () => {
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
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/students/courses`)
        if (response.data.status === 'success') {

            this.setState({
                courses: response.data.courses,
                display: false
            })
        }

    }
    handleFormData = event => {
        let value = event.target.value
        let name = event.target.name

        let newData = this.state.data;
        newData[name] = value

        this.setState({ data: newData })
    }
    apply = async () => {
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
        let data = this.state.data
        
        let response = await axios.post(`${process.env.REACT_APP_API_URL}/students/courses`, data)
        console.log(response.data)
        if (response.data.status === 'success') {
            NotificationManager.success(response.data.message, 'Success', 5000);
        }
        else if (response.data.status === 'error') {
            let message = response.data.message;
            for (const value of Object.values(message)) {
                NotificationManager.error(value, 'Error', 5000);
            }
        }
    }
    render() {
        return (
            <>
                <NotificationContainer />
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h4>Apply course</h4>
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
                                    <table class="table table-bordered m-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">Course</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.courses.length > 0 ? this.state.courses.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {value.title}
                                                        </td>
                                                        <td className="btnTD text-center">
                                                            <button type="button" name='id' value={value.id} class="btn btn-primary" onClick={this.handleFormData} data-toggle="modal" data-target="#exampleModal">
                                                                Apply
                                                            </button>
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
                
                <div class="modal fade" id="exampleModal" tabiIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Apply course</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <textarea className="form-control" placeholder="Qeyd" name="note" onChange={this.handleFormData}>{this.state.data.note}</textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => this.setState({data:{}})}>Close</button>
                                <button type="button" class="btn btn-primary" onClick={this.apply}>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

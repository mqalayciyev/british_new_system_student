import React, { Component } from 'react'
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    componentDidMount = async () => {
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
        let data = this.props.data
        this.setState({ data: data })
    }
    click = (e) => {
        if (e.target.classList.contains('hide-modal')) {
            this.props.removeComponent()
        }
    }
    handleFormData = event => {
        let value = event.target.value
        let name = event.target.name

        let newData = this.state.data;
        newData[name] = value

        this.setState({ data: newData })
    }

    sendForm = async (event) => {
        event.preventDefault()

        let data = this.state.data
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
        let response = ""
        if (this.props.edit === 0) {
            response = await axios.post(`http://127.0.0.1:8000/api/students/tasks`, data)
        }
        else {
            response = await axios.put(`http://127.0.0.1:8000/api/students/tasks/${this.props.edit}`, data)
        }
        console.log(response.data)
        if (response.data.status === 'success') {
            NotificationManager.success('Tapsiriq əlavə edildi.', 'Success', 5000);
            this.props.load()
        }
        if (response.data.status === 'error') {
            let message = response.data.message;
            for (const [key, value] of Object.entries(message)) {
                console.log(key)
                NotificationManager.error(value, 'Error', 5000);
            }
        }

    }
    render() {
        return (
            <>
                <NotificationContainer />
                <div class="modal fade bd-example-modal-lg hide-modal" id="exampleModal" onClick={this.click} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg hide-modal" role="document">
                        <form onSubmit={this.sendForm}>
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">{(this.props.edit !== 0) ? 'Edit' : 'Add'} task</h5>
                                    <button type="button" class="close hide-modal" data-dismiss="modal" aria-label="Close">
                                        <span className="hide-modal" aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <div class="form-group row">
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <label className="col-4  col-form-label">
                                                    Start:
                                        </label>
                                                <div className="col-8 ">
                                                    <input type="date" className="form-control" name="start_date" value={this.props.data.start_date} onChange={this.handleFormData} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <label className="col-4  col-form-label">
                                                    End:
                                        </label>
                                                <div className="col-8">
                                                    <input type="date" className="form-control" name="end_date" value={this.props.data.end_date} onChange={this.handleFormData} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row form-group mt-2">
                                        <div className="col-12">
                                            <div className="row">
                                                <label className="col-sm-3 col-form-label">
                                                    Period of time:
                                        </label>
                                                <div className="col-sm-9 mt-3 mt-sm-0">
                                                    <div className="form-group row">
                                                        <div className="col-6">
                                                            <input type="time" className="form-control" title="Start time" name="start_time" value={this.props.data.start_time} onChange={this.handleFormData} />
                                                        </div>
                                                        <div className="col-6">
                                                            <input type="time" className="form-control" title="End time" name="end_time" value={this.props.data.end_time} onChange={this.handleFormData} />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <label className="col-4 col-sm-6 col-form-label">
                                                    Priority:
                                            </label>
                                                <div className="col-8 col-sm-6">
                                                    <select className="form-control" name="priority" value={this.props.data.priority} onChange={this.handleFormData}>
                                                        <option value="">-- Priority --</option>
                                                        <option value="0">Low</option>
                                                        <option value="1">Middle</option>
                                                        <option value="2">High</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div className="row form-group mt-2">
                                        <div className="col-12">
                                            <div className="row">
                                                <label className="col-sm-3 col-form-label">
                                                    Description *:
                                        </label>
                                                <div className="col-sm-9 mt-3 mt-sm-0">
                                                    <textarea className="form-control" name="note" value={this.props.data.note} onChange={this.handleFormData}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="reset" class="btn btn-default hide-modal" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

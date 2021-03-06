import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
export default class Exams extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exams: [],
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
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/students/exam`)
        console.log(response.data)
        if (response.data.status === 'success') {
            this.setState({
                exams: response.data.exams,
                display: false
            })
        }
    }
    render() {
        const type = ['Seviyye yoxlanisi', 'Sinaq', 'Sertifikat']
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h4>Exams</h4>
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
                                                <th scope="col">Name</th>
                                                <th scope="col">Level</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Test</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Note</th>
                                                <th scope="col"></th>
                                                {/* <th scope="col"><button className="btn Btn32 text-danger"><i class="fas fa-trash"></i></button></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.exams.length > 0 ? this.state.exams.map((value, index) => {
                                                                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {value.name}
                                                        </td>
                                                        <td>
                                                            {value.level_title}
                                                        </td>

                                                        <td>
                                                            {type[value.type]}
                                                        </td>
                                                        <td>
                                                            {value.test_name}
                                                        </td>
                                                        <td>
                                                            {value.time} minutes
                                                        </td>
                                                        <td>
                                                            {value.note}
                                                        </td>
                                                        <td className="btnTD text-center">
                                                            <Link to={`ExamStart/${value.id}`} className="btn Btn32 btn-success"><i class="fas fa-play"></i></Link>
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
                {/* {
                    this.state.modal
                } */}
            </>
        )
    }
}

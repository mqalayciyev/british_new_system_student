import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import Results from './Results';

export default class ExamResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            display: true
        };
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
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/students/exam_results`)
        if (response.data.status === 'success') {
            this.setState({
                results: response.data.results,
                display: false
            })
        }
    }
    removeComponent = () => {
        this.setState({
            modal: []
        })
    }
    addComponent = (id) => {
        
        let modal = <Results type="exam" id={id} removeComponent={this.removeComponent} />

        this.setState({
            modal: modal
        })
    }
    render() {
        const type = ['Seviyye yoxlanisi', 'Sinaq', 'Sertifikat']
        return (
            <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <h4>Exam Results</h4>
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
                                            <th scope="col">Exam name</th>
                                            <th scope="col">Exam type</th>
                                            <th scope="col">Lesson</th>
                                            <th scope="col">Date</th>
                                            <th scope="col"></th>
                                            {/* <th scope="col"><button className="btn Btn32 text-danger"><i class="fas fa-trash"></i></button></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.results.length > 0 ? this.state.results.map((value, index) => {
                                            return (
                                                    <tr key={index}>
                                                        <td>
                                                            {value.exam_name}
                                                        </td>
                                                        <td>
                                                            {type[value.exam_type]}
                                                        </td>
                                                        <td>
                                                            {value.lesson_name}
                                                        </td>
                                                        <td>
                                                            {value.created_at}
                                                        </td>
                                                        <td className="btnTD text-center">
                                                            <button className="btn Btn32 btn-success" data-toggle="modal" data-target="#exampleModal" onClick={() => this.addComponent(value.exam)}><i className="fas fa-clipboard-list"></i></button>
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
            {
                    this.state.modal
                }
            </>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios';
export default class Exams extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exams: [],
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
        let response = await axios.get(`http://127.0.0.1:8000/api/students/exam`)
        console.log(response.data)
        if (response.data.status === 'success') {
            this.setState({
                exams: response.data.exams
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
                                <div className="table-responsive bg-white m-0 p-3 rounded shadow">
                                    <table class="table table-bordered m-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Level</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Test</th>
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
                                                            {value.note}
                                                        </td>
                                                        <td className="btnTD text-center">
                                                            {/* <button className="btn Btn32 btn-warning mx-1" data-toggle="modal" data-target="#exampleModal" onClick={() => this.addComponent(value)}><i class="fas fa-pencil-alt"></i></button> */}
                                                            {/* <button className="btn Btn32 btn-info"><i class="far fa-eye"></i></button> */}
                                                            <button className="btn Btn32 btn-success"><i class="fas fa-clipboard-list"></i></button>
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
                {/* {
                    this.state.modal
                } */}
            </>
        )
    }
}

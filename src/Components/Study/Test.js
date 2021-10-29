import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
export default class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tests: [],
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
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/students/tests`)
        console.log(response.data)
        if (response.data.status === 'success') {
            this.setState({
                tests: response.data.tests,
                display: false
            })
        }
    }
    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h4>Tests</h4>
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
                                                <th scope="col">Lesson</th>
                                                <th scope="col">Level</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Questions</th>
                                                <th scope="col"></th>
                                                {/* <th scope="col"><button className="btn Btn32 text-danger"><i class="fas fa-trash"></i></button></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.tests.length > 0 ? this.state.tests.map((value, index) => {
                                            const questions_count = JSON.parse(value.questions_count)
                                            const count = questions_count.filter(questions => questions.id !== null).length
                                                return (
                                                    <tr key={index}>

                                                        <td>
                                                            {value.name}
                                                        </td>

                                                        <td>
                                                            {value.lesson_title}
                                                        </td>
                                                        <td>
                                                            {value.level_title}
                                                        </td>
                                                        <td>
                                                            {value.note}
                                                        </td>
                                                        <td>
                                                            {count}
                                                        </td>
                                                        <td className="btnTD text-center">
                                                            <Link to={`TestStart/${value.id}`} className="btn Btn32 btn-success"><i class="fas fa-play"></i></Link>
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

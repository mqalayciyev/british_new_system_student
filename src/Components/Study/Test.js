import React, { Component } from 'react'
import Questions from './Questions';
import axios from 'axios';
export default class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tests: [],
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
        let response = await axios.get(`http://127.0.0.1:8000/api/students/tests`)
        console.log(response.data)
        if (response.data.status === 'success') {
            this.setState({
                tests: response.data.tests
            })
        }
    }
    removeComponent = () => {
        this.setState({
            modal: []
        })
    }
    questionsComponent = (value) => {

        let modal = <Questions id={value} removeComponent={this.removeComponent} load={this.load} />

        this.setState({
            modal: modal
        })
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
                                                            {/* <button className="btn Btn32 btn-warning mx-1" data-toggle="modal" data-target="#uploadTestModal" onClick={() => this.addComponent(value)}><i class="fas fa-pencil-alt"></i></button> */}
                                                            {/* <button className="btn Btn32 btn-info"><i class="far fa-eye"></i></button> */}
                                                            <button className="btn Btn32 btn-success" data-toggle="modal" data-target="#questionsModal" onClick={() => this.questionsComponent(value.id)}><i class="fas fa-clipboard"></i></button>
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
                {
                    this.state.modal
                }
            </>
        )
    }
}

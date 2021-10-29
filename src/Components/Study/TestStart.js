import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../../CSS/Questions.css';

export default class TestStart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
            shuffle: false,
            data: { questions: {} }
        }
    }

    componentDidMount = () => {
        // let item = ['UserID', 'testID', 'ExamStartTime', 'ExamTime'];
        let testID = this.props.match.params.id
        this.load(testID)

    }
    load = async (testID) => {
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

        let response = await axios.get(`${process.env.REACT_APP_API_URL}/students/tests/${testID}`)
        console.log(response.data)
        if (response.data.status === 'success') {
            this.setState({
                questions: response.data.questions.length > 0 ? response.data.questions : null,
                display: false
            })
        }
        if (response.data.status === 'error') {
            NotificationManager.error(response.data.message, 'Səhv', 5000);
        }
    }
    endTest = async (e) => {
        e.preventDefault();
        var request = window.confirm("Testi bitirmək istədiyinizə əminsiniz?");
        if (request === true) {
            let data = this.state.data
            data['test'] = this.props.match.params.id
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

            let response = await axios.post(`${process.env.REACT_APP_API_URL}/students/tests/`, data)
            if (response.data.status === 'success') {
                NotificationManager.success(response.data.message, 'Uğurlu', 5000);
                window.location.href = '/TestResults';
            }
            if (response.data.status === 'error') {
                let message = response.data.message;
                for (const value of Object.values(message)) {
                    NotificationManager.error(value, 'Səhv', 5000);
                }
            }
        } else {
            NotificationManager.warning('Test davam edir', 'Xəbərdarlıq', 5000);
        }


    }
    exitTest = (e) => {
        e.preventDefault();
        window.location.href = '/Tests';
    }
    formHandler = (e) => {
        let value = e.target.value
        let name = e.target.name

        let data = this.state.data;
        let questions = this.state.data.questions;
        questions[name] = value
        data['questions'] = questions

        this.setState({
            data: data
        })
    }
    render() {
        let content = [];
        let count_q = 1;
        if (this.state.questions) {
            Object.values(this.state.questions).forEach((value) => {

                let answers = JSON.parse(value.answers)
                // if(!this.state.shuffle){
                //     var answers = JSON.parse(value.answers).sort( () => .5 - Math.random() )
                //     this.setState({shuffle: true})
                // }
                let arr = (<div className="container my-1">
                    <div className="question ml-sm-5 pl-sm-5 pt-2">
                        <div className="py-2 h5">
                            <b id={value.id} key={value.id}>{count_q}. {value.question}</b>
                        </div>
                        <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                            {

                                answers.map((answer) => {
                                    return (
                                        <label className="options"> {answer.answer}
                                            <input type="radio" name={`question_${value.id}`} value={`${answer.answer_id}`} onChange={(e) => this.formHandler(e)} />
                                            <span className="checkmark"></span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>)
                content.push(arr)

                count_q++
            })
        }
        else {
            content.push(<h3 className="text-center">Empty</h3>)
        }
        return (
            <>
                <NotificationContainer />
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h4>{this.state.questions ? this.state.questions.test_name : 'Test Start'}</h4>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <div className="loading" style={{ display: this.state.display ? 'block' : 'none', top: '15px' }}>
                                    <div className="text-center">
                                        <span>
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                                <form onSubmit={(e) => this.endTest(e)}>
                                    <div className="bg-white p-3 rounded shadow">
                                        <div className="row justify-content-between" style={{ display: this.state.questions ? '' : 'none' }}>
                                            <button type="submit" className="btn btn-success">End</button>
                                            <button type="button" className="btn btn-danger" onClick={(e) => this.exitTest(e)}>Exit</button>
                                        </div>
                                        {
                                            content
                                        }
                                        <div className="row justify-content-between" style={{ display: this.state.questions ? '' : 'none' }}>
                                            <button type="submit" className="btn btn-success">End</button>
                                            <button type="button" className="btn btn-danger" onClick={(e) => this.exitTest(e)}>Exit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

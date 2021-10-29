import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../../CSS/Questions.css';

export default class ExamStart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
            shuffle: false,
            time: '',
            data: { questions: {} }
        }
    }

    componentDidMount = () => {
        // let item = ['UserID', 'ExamID', 'ExamStartTime', 'ExamTime'];
        let examID = this.props.match.params.id
        if (sessionStorage.getItem('exam')) {
            let session = sessionStorage.getItem('exam').split(',')
            if(!parseInt(session[1]) === examID){
                sessionStorage.removeItem('exam')
                this.load(examID)
                return false;
            }
            let date = new Date()
            let time = date.getTime();
            if (parseInt(session[3]) > 0) {
                let endTime = (parseInt(session[3]) * 60000) + parseInt(session[2])
                let startTime = parseInt(session[2])
                if (time >= endTime) {
                    sessionStorage.removeItem('exam')
                    NotificationManager.warning('İmtahan vaxtı sona çatıb. İmtahanı yenidən başladın.', 'Xəbərdarlıq', 5000);
                }
                else {
                    let qalan = (endTime - startTime) - (time - startTime)
                    let minutes = parseInt((qalan / 60000) % 60);
                    let seconds = (qalan / 1000) % 60;
                    this.load(examID, [minutes, seconds])
                }
            }
            else {
                this.load(examID)
            }
        }
        else {
            this.load(examID)
        }

    }
    counter = (minutes, seconds) => {
        let time = '';
        minutes = (parseInt(seconds) === 0) ? parseInt(minutes) - 1 : parseInt(minutes)
        seconds = (parseInt(seconds) === 0) ? 59 : parseInt(seconds);

        let myinterval = setInterval(() => {
            if (seconds === 0) {
                minutes--
                seconds = 59;
            }
            else {
                seconds--
            }
            if (seconds === 0 && minutes === 0) {
                clearInterval(myinterval)
                this.end()
            }
            time = minutes + ":" + seconds
            this.setState({
                time: time
            })
        }, 1600);
    }
    load = async (examID, set) => {
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

        let response = await axios.get(`${process.env.REACT_APP_API_URL}/students/exam/${examID}`)
        console.log(response.data)
        if (response.data.status === 'success') {
            this.setState({
                exam: response.data.exam,
                questions: response.data.questions,
                display: false
            })
            if (this.state.exam && this.state.questions) {
                if (!sessionStorage.getItem('exam')) {
                    let date = new Date()
                    let time = date.getTime();
                    sessionStorage.setItem('exam', [student.user.user_id, examID, time, this.state.exam.time])
                    if (parseInt(this.state.exam.time) > 0) {
                        this.counter(this.state.exam.time, 0)
                    }
                }
                if (set) {
                    this.counter(set[0], set[1])
                }
            }
        }
        if (response.data.status === 'error') {
            NotificationManager.error(response.data.message, 'Səhv', 5000);
        }
    }
    endExam = async (e) => {
        e.preventDefault();
        var request = window.confirm("İmtahanı bitirmək istədiyinizə əminsiniz?");
        if (request === true) {
            let data = this.state.data
            data['exam'] = this.props.match.params.id
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

            let response = await axios.post(`${process.env.REACT_APP_API_URL}/students/exam/`, data)
            if (response.data.status === 'success') {
                sessionStorage.removeItem('exam')
                NotificationManager.success(response.data.message, 'Uğurlu', 5000);
                window.location.href = '/ExamResults';
            }
            if (response.data.status === 'error') {
                let message = response.data.message;
                for (const value of Object.values(message)) {
                    NotificationManager.error(value, 'Səhv', 5000);
                }
            }
        } else {
            NotificationManager.warning('İmtahan davam edir', 'Xəbərdarlıq', 5000);
        }


    }
    end = async () => {
        let data = this.state.data
        data['exam'] = this.props.match.params.id
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

        let response = await axios.post(`${process.env.REACT_APP_API_URL}/students/exam/`, data)
        if (response.data.status === 'success') {
            sessionStorage.removeItem('exam')
            NotificationManager.success(response.data.message, 'Uğurlu', 5000);
            window.location.href = '/ExamResults';
        }
        if (response.data.status === 'error') {
            let message = response.data.message;
            for (const value of Object.values(message)) {
                NotificationManager.error(value, 'Səhv', 5000);
            }
        }


    }
    exitExam = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('exam')
        window.location.href = '/Exams';
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
        if (this.state.exam) {
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
        }
        else {
            content.push(<h3 className="text-center">Empty</h3>)
        }
        // const type = ['Seviyye yoxlanisi', 'Sinaq', 'Sertifikat']
        return (
            <>
                <NotificationContainer />
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h4>{ this.state.exam ? this.state.exam.name : 'Exam Start' }</h4>
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
                                <form onSubmit={(e) => this.endExam(e)}>
                                    <div className="bg-white p-3 rounded shadow">
                                        <div className="row justify-content-between" style={{ display: this.state.exam ? '' : 'none' }}>
                                            <button type="submit" className="btn btn-success">End</button>
                                            <div>{this.state.time}</div>
                                            <button type="button" className="btn btn-danger" onClick={(e) => this.exitExam(e)}>Exit</button>
                                        </div>
                                        {
                                            content
                                        }
                                        <div className="row justify-content-between" style={{ display: this.state.exam ? '' : 'none' }}>
                                            <button type="submit" className="btn btn-success">End</button>
                                            <div>{this.state.time}</div>
                                            <button type="button" className="btn btn-danger" onClick={(e) => this.exitExam(e)}>Exit</button>
                                        </div>
                                    </div>
                                </form>
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

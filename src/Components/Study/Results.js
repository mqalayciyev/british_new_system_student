import React, { Component } from 'react'
import axios from 'axios';
import Select from 'react-select';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../../CSS/Questions.css';

export default class Results extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
        };
    }
    click = (e) => {
        if (e.target.classList.contains('hide-modal')) {
            this.props.removeComponent()
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
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/students/${this.props.type}_results/${this.props.id}`)
        console.log(response.data)
        if (response.data.status === 'success') {
            this.setState({
                results: response.data.results,
                display: false
            })
        }
    }
    render() {
        let content = [];
        let count_q = 1;
        if (this.state.results.length > 0) {
            Object.values(this.state.results).forEach((value) => {

                let answers = JSON.parse(value.answers)

                let arr = (<div className="container my-1">
                    <div className="question ml-sm-5 pl-sm-5 pt-2">
                        <div className="py-2 h5">
                            <b id={value.id} key={value.id}>{count_q}. {value.question}</b>
                        </div>
                        <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                            {

                                answers.map((answer) => {
                                    console.log(value.student_answer, answer.answer_id)
                                    let checked = 0
                                    if(value.student_answer === answer.answer_id && answer.answer_true === 1){
                                        checked = 1
                                    }
                                    return (
                                        <label className="options" > <span className={`px-2 py-1 ${answer.answer_true === 1 ? 'bg-success' : ''} `}>{answer.answer}</span>
                                            <input checked={value.student_answer === answer.answer_id}  type="checkbox" />
                                            <span className="checkmark" style={{ backgroundColor:  (value.student_answer === answer.answer_id && answer.answer_true === 0) ? 'red' : ''}}></span>
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
                <div class="modal fade bd-example-modal-lg hide-modal" id="exampleModal" onClick={this.click} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg hide-modal" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{this.state.results.length > 0 ? this.state.results[0].name : ''}</h5>
                                <button type="button" class="close hide-modal" data-dismiss="modal" aria-label="Close">
                                    <span className="hide-modal" aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {
                                    content
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

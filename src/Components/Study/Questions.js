import React, { Component } from 'react'
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class Questions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answers: [],
            questions: [],
            end: false
        }
    }
    componentDidMount = () => {
        this.load()
    }
    load = async name => {
        let userInfo = JSON.parse(localStorage.getItem('user-info'))
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${userInfo.user.token}`;
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
        let response = await axios.get(`http://127.0.0.1:8000/api/managers/questions`)
        if (response.data.status === 'success') {
            // console.log(response.data)
            this.setState({
                questions: response.data.questions
            })
        }


    }
    click = (e) => {
        if (e.target.classList.contains('hide-modal')) {
            if(Object.keys(this.state.answers).length === 0){
                this.props.removeComponent()
            }
            else{
                const removeElements = (elms) => elms.forEach(el => el.remove());
                removeElements( document.querySelectorAll(".modal-backdrop") );
                // var elem = document.getElementsByClassName("");
                // elem.removeChild();
                let div = document.createElement('div')
                div.className = "modal-backdrop show"
                document.getElementById('questionsModal').style.overflow = 'auto'
                document.body.appendChild(div)
                this.setState({end: true})
            }
        }
        
    }
    onChange = (e) => {
        let name = e.target.name
        let answer = e.target.value
        let answers = this.state.answers
        let questions = answers.questions
        questions[name] = answer
        this.setState({ answers })
    }
    endTest = async() => {
        let data = this.state.answers
        data['test'] = this.props.id
        console.log(data)
        let userInfo = JSON.parse(localStorage.getItem('user-info'))
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${userInfo.user.token}`;
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
        let response = await axios.post(`http://127.0.0.1:8000/api/students/test-end`, data)
        if (response.data.status === 'success') {
            this.props.removeComponent()
            const removeElements = (elms) => elms.forEach(el => el.remove());
            removeElements( document.querySelectorAll(".modal-backdrop") );
        }
        
    }
    render() {
        return (
            <>
                <SweetAlert
                    title={"Are you sure?"}
                    type={`warning`}
                    onConfirm={this.endTest}
                    onCancel={() => this.setState({ end: false })}
                    showCancel={`true`}
                    show={this.state.end}
                    confirmBtnBsStyle="success"
                    confirmBtnText="Yes, it ends."
                    cancelBtnBsStyle="danger"
                    cancelBtnText='No, go ahead.'
                />
                <div class="modal d-block hide-modal bd-example-modal-lg" id="questionsModal" onClick={this.click} tabindex="-1" role="dialog" aria-labelledby="questionsModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg hide-modal" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close hide-modal" data-dismiss="modal" aria-label="Close">
                                    <span className="hide-modal" aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <button type="button" className="btn btn-danger end-test mb-2" style={{display: Object.keys(this.state.answers).length === 0 && 'none' }} onClick={() => this.setState({end: true}) }>End Test</button>

                                <div class="accordion" id="accordionPanelsStayOpenExample">
                                    {this.state.questions.length > 0 ? this.state.questions.map((value, index) => {
                                        let data = value

                                        const answers = JSON.parse(value.answers)
                                        for (let i = 0; i < answers.length; i++) {
                                            data[answers[i].answer_title] = answers[i].answer
                                        }
                                        return (
                                            <div class="card" key={index}>
                                                <div className="card-header bg-secondary">
                                                    <p className="card-title"> <span>{index + 1})</span> <b>{value.question}</b></p>
                                                </div>
                                                <ul class="list-group list-group-flush">
                                                    {
                                                        answers.map((v, i) => {
                                                            return (
                                                                <li key={i} className="list-group-item ml-3"> <label> <input type="radio" onChange={this.onChange} name={`question_${value.id}`} data-question={value.id} data-answer={v.id} value={v.id} /> {v.answer} </label></li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }) : <h4 className="text-center">Empty</h4>
                                    }
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary hide-modal" data-dismiss="modal">Close</button>
                                {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.add
                }
            </>

        )
    }
}

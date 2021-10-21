import React, { Component } from 'react'
import Lesson from './Lesson';
import axios from 'axios';
export default class Lessons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lessons_p: [],
            lessons_g: [],
            lessons_d: [],
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
        let response = await axios.get(`http://127.0.0.1:8000/api/students/lesson`)
        console.log(response.data)
        if (response.data.status === 'success') {
            this.setState({
                lessons_g: response.data.lessons_g,
                lessons_p: response.data.lessons_p,
                lessons_d: response.data.lessons_d
            })
        }


    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h4>Lessons</h4>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 bg-white p-2">
                                {
                                this.state.lessons_g.map((value, index) => {
                                    return (
                                        <Lesson key={index} value={value} type="Group" />
                                    )
                                })
                                }

                                {
                                this.state.lessons_d.map((value, index) => {
                                    return (
                                        <Lesson key={index} value={value} type="Demo" />
                                    )
                                })
                                }

                                {
                                this.state.lessons_p.map((value, index) => {
                                    return (
                                        <Lesson key={index} value={value} type="Private" />
                                    )
                                })
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

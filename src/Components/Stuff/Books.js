import React, { Component } from 'react'
import media from '../../img/books-1024x1024.jpg';
import axios from 'axios';
export default class Books extends Component {
    constructor(props) {
        super(props)
        this.state = {
            media: [],
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
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/students/book`)

        if (response.data.status === 'success') {
            this.setState({
                media: response.data.media,
                display: false
            })
        }


    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12">
                                <h4>Books</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 ">
                                <div className="col-12 bg-white py-2">
                                <div className="loading" style={{ display: this.state.display ? 'block' : 'none', top: '8px' }}>
                                    <div className="text-center">
                                        <span>
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                                    <div className="row">
                                        {this.state.media.length > 0 ? this.state.media.map((value, index) => {
                                            return (
                                                <div className="col-md-3 p-3">
                                                    <div className="row">
                                                        <div className="col-12 border p-3" style={{ height: '300px' }}>
                                                            <div className="row align-items-center justify-content-center h-100">
                                                                <a href={value.file} target="_blank" rel="noreferrer">
                                                                    <img className="w-100" alt='book' src={media} />
                                                                    <p className="text-center m-0 mt-3">{value.title}</p>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : <div className="col-12"><h3 className="text-center">No Media <i class="far fa-frown"></i></h3></div>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

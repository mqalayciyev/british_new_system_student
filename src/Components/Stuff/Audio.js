import React, { Component } from 'react'
import media from '../../img/audio-100x100.png';
import ViewAudio from './Modals/ViewAudio';
import axios from 'axios';

export default class Audio extends Component {
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
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/students/audio`)
        console.log(response.data)
        if (response.data.status === 'success') {
            this.setState({
                media: response.data.media,
                display: false
            })
        }


    }
    removeComponent = () => {
        this.setState({
            modal: []
        })
    }
    addComponent = (value) => {
        
        let modal = <ViewAudio media={value} removeComponent={this.removeComponent} />

        this.setState({
            modal: modal
        })
    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12">
                                <h4>Audio</h4>
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
                                                                <div data-toggle="modal" data-target="#exampleModal" onClick={() => this.addComponent(value.file)}>
                                                                    <img className="w-100" src={media} alt='audio' onClick={() => this.addComponent(value.file)} />
                                                                    <p className="text-center m-0 mt-3">{value.title}</p>
                                                                </div>
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
                {
                    this.state.modal
                }
                
            </>
        )
    }
}

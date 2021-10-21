import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip';
import {
    Link
} from "react-router-dom";
import axios from 'axios';
import img from '../../img/profile.jpg';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export default class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = { messages: [], myid: 0};
    }
    componentDidMount = () => {
        this.load()
    }
    load = async name => {
        let student = JSON.parse(localStorage.getItem('student'))
        this.setState({myid: student.user.user_info.id})
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${student.user.token}`;
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
        let response = await axios.get(`http://127.0.0.1:8000/api/students/messages`)
        if(response.data.status === 'success'){
            // console.log(response.data.messages)
            this.setState({
                messages: response.data.messages
            })
        }
        
    }
	    delete = async id => {
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
        let response = await axios.delete(`http://127.0.0.1:8000/api/managers/messages/${id}`)


        if (response.data.status === 'success') {
            NotificationManager.warning(response.data.message, 'Warning', 5000);
            this.load()
        }
    }
    message = (messages) => {
        let collection = []
        let include = []
        for (let value of Object.values(messages)) {
            console.log(value.message)

            // return value.message

            if (value.sender !== this.state.myid) {
                let status = value.status ? 1 : 0;
                if(!include.includes(value.sender)){
                    include.push(value.sender)
                    collection.push(
                        <tr className={status ? '' : 'bg-warning'}>
                            <td>
                                <img className="rounded-circle h-100 w-100" style={{ maxWidth: '60px', maxHeight: '60px' }} src={value.user1_image ? value.user1_image : img} alt='account' />
                                {value.image}
                            </td>
                            <td>
                                <b><Link to={{  pathname: `/Messages/Chat/${value.sender}`}}>{value.user_1}</Link></b>
                            </td>
                            <td className="btnTD text-center">
                                <Link to={{  pathname: `/Messages/Chat/${value.sender}`}} className="btn Btn32 btn-success" ref={ref => this.fooRef = ref} data-tip='Write a message...'>
                                    <i className="fa fa-comment"></i>
                                </Link>
								<button className="btn Btn32 btn-danger" onClick={() => this.delete(value.sender)} ref={ref => this.fooRef = ref} data-tip='Sil'><i class="fas fa-trash"></i></button>
                                
                                <ReactTooltip />
        
                                {/* <button className="btn Btn32 btn-danger" data-id={value.id} data-link="lesson" onClick={this.delete}><i className="fas fa-trash"></i></button> */}
        
                            </td>
                        </tr>
                    )
                }
            }
            else if (value.receiving !== this.state.myid) {
                let status = value.status ? 1 : 0;
                if(!include.includes(value.receiving)){
                    include.push(value.receiving)

                    collection.push(
                        <tr className={status ? '' : 'bg-warning'}>
                            <td>
                                <img className="rounded-circle h-100 w-100" style={{ maxWidth: '60px', maxHeight: '60px' }} src={value.user2_image ? value.user2_image : img} alt='account' />
                                {value.image}
                            </td>
                            <td>
                                <b><Link to={`/Messages/Chat/${value.receiving}`}>{value.user_2}</Link></b>
                            </td>
                            <td className="btnTD text-center">
                                <Link to={`/Messages/Chat/${value.receiving}`} className="btn Btn32 btn-success" ref={ref => this.fooRef = ref} data-tip='Write a message...'>
                                    <i className="fa fa-comment"></i>
                                </Link>
								<button className="btn Btn32 btn-danger" onClick={() => this.delete(value.receiving)} ref={ref => this.fooRef = ref} data-tip='Sil'><i class="fas fa-trash"></i></button>
                                
                                <ReactTooltip />
        
                                {/* <button className="btn Btn32 btn-danger" data-id={value.id} data-link="lesson" onClick={this.delete}><i className="fas fa-trash"></i></button> */}
        
                            </td>
                        </tr>
                    )
                }
            }
        };
        return collection;
    }
    dateReplace = (time) => {
        let date = new Date(time)
        date = date.toString()
        date = date.split('GMT')[0]
        return date
    }
    render() {
        return (
				            <>
            <NotificationContainer />
            <div className="row">
                <div className="col-12">
                    <div className="row">
						<div className="col-12">
							<h4>Messages</h4>
						</div>
					</div>
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive bg-white m-0 p-3 rounded shadow">
                                <table className="table table-bordered m-0">
                                    <tbody>
                                    {
                                            this.state.messages.length > 0 ? this.message(this.state.messages) : <tr><td colSpan="12" className="text-center">Empty</td></tr>
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
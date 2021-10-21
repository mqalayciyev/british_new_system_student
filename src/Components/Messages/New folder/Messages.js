import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip';
export default class Messages extends Component {
    render() {
        return (
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
                                <table class="table table-bordered m-0">
                                    <tbody>
                                        <tr>
                                            <td className="text-center">
                                                <img className="rounded-circle h-100 w-100" style={{maxWidth: '100px', maxHeight: '100px'}} src="https://publichealth.uga.edu/wp-content/uploads/2020/01/Thomas-Cameron_Student_Profile.jpg" alt='account' />
                                            </td>
                                            <td>
                                                <a href="#">Cameron Thomas</a>
                                            </td>
                                            <td>
                                                <b>Student</b>
                                                <p>Group name</p> 
                                            </td>
                                            <td>
                                                <p><time>2/9/2021</time></p>
                                                <p><time>7:39:35 PM</time></p>
                                            </td>
                                            <td>
                                                <span>Last Message</span>
                                            </td>
                                            <td className="text-center px-0">
                                                <p>
                                                    <a href="/MessagesUser" type="button" class="btn Btn32 btn-success" ref={ref => this.fooRef = ref} data-tip='Write a message...'>
                                                        <i class="fa fa-comment"></i>
                                                    </a>
                                                    <ReactTooltip />
                                                </p>
                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
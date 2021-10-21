import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip';
export default class AttendanceMap extends Component {
    render() {
        return (
            <>
            <ReactTooltip />
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <h4>Exams</h4>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="table-responsive bg-white m-0 p-3 rounded shadow">
                                <table class="table table-bordered m-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Student</th>
                                            <th scope="col">Office</th>
                                            <th scope="col">Teacher</th>
                                            <th scope="col">Lesson</th>
                                            <th scope="col">Attendance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                            Student1
                                            </td>
                                            <td>
                                            Caspian
                                            </td>
                                            <td>
                                            Teacher1
                                            </td>
                                            <td>English</td>
                                            <td>
                                            <div className="col-12 schedule">
                                                <span className='schedule_item back' data-tip="Back"><i class="fas fa-angle-double-left"></i></span>
                                                <span className='schedule_item bg-danger' data-tip="01/04/2021">01/04</span>
                                                <span className='schedule_item bg-primary' data-tip="02/04/2021">02/04</span>
                                                <span className='schedule_item bg-success' data-tip="03/04/2021">03/04</span>
                                                <span className='schedule_item bg-success' data-tip="04/04/2021">04/04</span>
                                                <span className='schedule_item bg-success' data-tip="05/04/2021">05/04</span>
                                                <span className='schedule_item bg-light' data-tip="06/04/2021">06/04</span>
                                                <span className='schedule_item bg-light' data-tip="07/04/2021">07/04</span>
                                                <span className='schedule_item next' data-tip="Next"><i class="fas fa-angle-double-right"></i></span>
                                            </div>
                                            </td>
                                        </tr>
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

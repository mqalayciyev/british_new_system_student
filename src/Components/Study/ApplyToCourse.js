import React, { Component } from 'react'
export default class ApplyToCourse extends Component {
    render() {
        return (
            <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <h4>Students</h4>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="table-responsive bg-white m-0 p-3 rounded shadow">
                                <table class="table table-bordered m-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Office</th>
                                            <th scope="col">Discipline</th>
                                            <th scope="col">Level</th>
                                            <th scope="col">Schedule</th>
                                            <th scope="col"></th>
                                            {/* <th scope="col"><button className="btn Btn32 text-danger"><i class="fas fa-trash"></i></button></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Novyi Arbat</td>
                                            <td>English</td>
                                            <td>Pre-intermediate</td>
                                            <td>12:00 PM-1:00 PM Mon (from 2/1)  11:00 AM-12:00 PM Tue (from 2/2)</td>
                                            <td className="btnTD text-center">
                                                <button className="btn btn-primary mx-1">Apply</button>
                                                
                                            </td>
                                            {/* <th scope="row" className="text-center"><input type="checkbox" name="checkbox" /></th> */}
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

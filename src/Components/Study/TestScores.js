import React, { Component } from 'react'
export default class TestScores extends Component {
    render() {
        return (
            <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <h4>Group lessons</h4>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="table-responsive bg-white m-0 p-3 rounded shadow">
                                <table class="table table-bordered m-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Test type</th>
                                            <th scope="col">Language</th>
                                            <th scope="col">Teacher / Group</th>
                                            <th scope="col">Test Category</th>
                                            <th scope="col">Test result</th>
                                            <th scope="col">Description</th>
                                            {/* <th scope="col"><button className="btn Btn32 text-danger"><i class="fas fa-trash"></i></button></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>02/25/2021</td>
                                            <td>Online</td>
                                            <td>English</td>
                                            <td>Teacher</td>
                                            <td>Category</td>
                                            <td>2/16 (12.5%)</td>
                                            <td>Lorem ipsum sit amount</td>
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

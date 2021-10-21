import React, { Component } from 'react';

export default class Announcements extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: 0,
        }
      }
    render() {
        return (
            <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <h4>Announcements</h4>
                        </div>
                        <div className="col-12 col-sm-6 clearfix">
                            <button type="button" class="btn btn-info  float-right" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap" onClick={() => this.setState({edit: 0})}>Add</button>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="table-responsive bg-white m-0 p-3 rounded shadow">
                                <table class="table table-bordered m-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Added</th>
                                            <th scope="col">Created by</th>
                                            <th scope="col">Body</th>
                                            <th scope="col"></th>
                                            {/* <th scope="col"><button className="btn Btn32 text-danger"><i class="fas fa-trash"></i></button></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>
                                                <time>01.04.2021</time>
                                            </td>
                                            <td>
                                            Ignatov Valerii
                                            </td>
                                            <td className="w-100">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                            </td>
                                            <td className="btnTD text-center">
                                                <button className="btn Btn32 btn-warning mx-1" data-toggle="modal" data-target="#exampleModal" onClick={() => this.setState({edit: 1})}><i class="fas fa-pencil-alt"></i></button>
                                                <button className="btn Btn32 btn-info"><i class="far fa-eye"></i></button>
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

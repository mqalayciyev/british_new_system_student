import React, { Component } from 'react'

export default class Chat extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row">
						<div className="col-12">
							<h4>User Name</h4>
						</div>
					</div>
                    <div className="row">
                        <div className="col-12">
                            <textarea className="form-control" rows="3"></textarea>
                            <div className="row mt-2">
                                <div className="col-sm-6"><input type="file" /></div>
                                <div className="col-sm-6 text-right"><button className="btn btn-success">Send</button></div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12">
                            <div className="col-12 p-3 bg-white pb-4">
                                <div className="row mt-3">
                                    <div className="col">
                                        <img className="rounded-circle w-100 h-auto" style={{maxWidth: '80px', maxHeight: '80px'}} src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png" />
                                    </div>
                                    <div className="col-11">
                                        <div className="position-relative col-12 px-3 rounded" style={{border: '1px solid #20C997FF'}}>
                                            <div class="TypingArrowLeft"></div>
                                            <p><a href="">Pantsoulaya D.</a> 9 Fevral 2021 19:39:35</p>
                                            <p>wefwerfr3f</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3" align="right">
                                    <div className="col-11">
                                        <div className="position-relative col-12 px-3 rounded" style={{border: '1px solid #4aa9e9'}}>
                                            <div class="TypingArrowRight"></div>
                                            <p>9 Fevral 2021 19:39:35 <b>You</b></p>
                                            <p>wefwerfr3f</p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <img className="rounded-circle w-100 h-auto" style={{maxWidth: '80px', maxHeight: '80px'}} src="https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

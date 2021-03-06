import React from 'react';
import About from './About';
import Tasks from './Tasks';
import Edit from './EditProfil';

class Profile extends React.Component {
    constructor (props){
        super(props)
        const student = localStorage.getItem('student')
        const user = JSON.parse(student)
        this.state = {
            user: user.user.user_info,
            office: user.office
        }
    }
    render() {
        
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6">
                                <h5>{`${this.state.user.first_name} ${this.state.user.last_name}`}</h5>
                            </div>
                            <div className="col-6 text-right">
                                <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-pencil-alt"></i></button>
                            </div>
                        </div>
                        <div className="d-block clearfix mt-3">
                            <About user={this.state.user} office={this.state.office} />
                            <Tasks />
                        </div>
                    </div>
                </div>
                <Edit user={this.state.user} office={this.state.office}/>
            </>
        );

    }
}

export default Profile;
import React, { Component } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
export default class Lesson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            body: false,
        }
    }
    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    render() {
        const student = JSON.parse(localStorage.getItem('student'))
        const study_days = this.props.value.study_days ? JSON.parse(this.props.value.study_days) : []
        return (
            <div className="row">
                <Accordion className="col-sm-12">
                    <Card style={{ borderRadius: '4px 4px 0px 0px' }}>
                        <Card.Header className={`card-header clearfix text-white ${(this.state.body) ? 'bg-primary' : 'bg-white border text-primary'}`} >
                            <Accordion.Toggle as={Button} variant="link" eventKey="1" className={` clearfix w-100 text-left ${(this.state.body) ? 'text-white' : 'text-primary'}`} onClick={() => this.setState({ body: !this.state.body })}>
                                <b>{this.props.value.lesson_title} ({this.props.type})</b>
                                <span className="float-right" style={{ cursor: 'pointer', userSelect: 'none' }}><i class={(this.state.body) ? 'fas fa-minus' : 'fas fa-plus'}></i></span>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div>Learnign Type <b>: {this.props.value.learning_type}</b></div>
                                <div>Level <b>: {this.props.value.level_title}</b></div>
                                <div>Office <b>: {this.props.value.office_name}</b></div>
                                <div>Academ. hours <b>: {this.props.value.office_name}</b></div>
                                <div>Teacher <b>: {this.props.value.teacher_name}</b></div>
                                <div>Period <b>: {this.props.value.period}</b></div>
                                <div>Price <b>: {this.props.value.minutes && this.props.value.minutes + ' minutes - '} {this.props.value.price && this.props.value.price + student.company.currency}</b></div>
                                <div>Total hours <b>: {this.props.value.hours}</b></div>
                                <div>Total price <b>: {this.props.value.hours * 60 * this.props.value.price / this.props.value.minutes + student.company.currency}</b></div>

                                <div className="col-12 schedule p-2">
                                    {
                                        study_days.map((element, i) => {
                                            let label = Object.keys(element).find(key => element[key] === 1 && key.toLowerCase() !== 'id' && key.toLowerCase() !== 'company' && key.toLowerCase() !== 'group')
                                            let time = label + "_time";
                                            return <span key={i} className="border border-info p-2 ml-1 rounded">{this.capitalize(label)} {element[time]}</span>
                                        })
                                    }
                                    {/* <span className='schedule_item back'><i class="fas fa-angle-double-left"></i></span>
                                    <span className='schedule_item'>21/04</span>
                                    <span className='schedule_item next'><i class="fas fa-angle-double-right"></i></span> */}
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}

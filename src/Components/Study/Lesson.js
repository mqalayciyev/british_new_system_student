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
    dateReplace = (time) => {
        let date = new Date(time)
        date = date.toString()
        date = date.split('GMT')[0]
        return date
    }
    render() {
        const student = JSON.parse(localStorage.getItem('student'))
        const study_days = this.props.value.study_days ? JSON.parse(this.props.value.study_days) : {}
        let days = []
        for (const [keys, value] of Object.entries(study_days)) {
            if (keys !== 'id' && keys !== 'company' && keys !== 'group' && value === 1) {
                days.push(<p className="m-0 pl-3"><b>{this.capitalize(keys)}</b></p>)
            }
        }
        return (
            <div className="row">
                <Accordion className="col-sm-12">
                    <Card style={{ borderRadius: '4px 4px 0px 0px' }}>
                        <Card.Header className={`card-header clearfix text-white ${(this.state.body) ? 'bg-primary' : 'bg-white border text-primary'}`} >
                            <Accordion.Toggle as={Button} variant="link" eventKey="1" className={`clearfix w-100 text-left ${(this.state.body) ? 'text-white' : 'text-primary'}`} onClick={() => this.setState({ body: !this.state.body })}>
                                <b>{this.props.value.lesson_title} ({this.props.type})</b>
                                <span className="float-right" style={{ cursor: 'pointer', userSelect: 'none' }}><i class={(this.state.body) ? 'fas fa-minus' : 'fas fa-plus'}></i></span>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div>Age Category <b>: {this.props.value.age_category}</b></div>
                                <div>Learnign Type <b>: {this.props.value.learning_type}</b></div>
                                <div>Level <b>: {this.props.value.level_title}</b></div>
                                <div>Office <b>: {this.props.value.office_name}</b></div>
                                <div>Teacher <b>: {this.props.value.teacher_name}</b></div>
                                <div>Price <b>: {this.props.value.minutes && this.props.value.minutes + ' minutes x '} {this.props.value.price && this.props.value.price + this.props.value.currency}</b></div>
                                <div>Total hours <b>: {this.props.value.hours}</b></div>
                                <div>Total price <b>: {this.props.value.hours * 60 * this.props.value.price / this.props.value.minutes + this.props.value.currency}</b></div>
                                <div >
                                Study Days: {this.props.value.lesson_date ? this.dateReplace(this.props.value.lesson_date) : ''}
                                    {days}
                                </div>




                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}

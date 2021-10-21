import React, { Component } from 'react'
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';
export default class Calendar extends Component {
    render() {
        return (
            <>
                <ScheduleComponent>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
            </>
        )
    }
}

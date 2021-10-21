import React, { Component } from 'react'

export const SessionContext = React.createContext();
SessionContext.displayName = 'SessionContext';


export class SessionContextProvider extends Component {
    constructor (props){
        super(props);


        this.state = {
            session: false,
            manager: [],
        };
    }

    componentDidMount = async event =>{
        let student = localStorage.getItem('student')
        if(student){
            this.setState({session: true, manager: JSON.parse(student)})
        }
        
    }
    
    setSession = (status, value) => {
        if(status === 'success'){
            this.setState({session: true, manager: value})
        }
        else{
            this.setState({session: false, manager: []})
        }
        
        
    }
    render() {
        return (
            <SessionContext.Provider value={{...this.state, setSession: this.setSession}}>
                {this.props.children}
            </SessionContext.Provider>
        )
    }
}

export default SessionContextProvider;

import React, { Component } from 'react'


import App from './App';
import Session from './Session/Session';
export default class Master extends Component {
    constructor(props){
        super(props);
        this.state={
            session: true,
        }
    }
    render() { 
        if(this.state.session){
            return <App />
        } 
        else{
            return <Session />
        }
        
    }
}

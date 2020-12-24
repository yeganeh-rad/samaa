import React, { Component } from 'react';
import  {RegisterRequest}  from './RegisterRequest';
import { Register2 } from './Register2';
import { RegisterPerson } from './RegisterPerson';
import {File} from './File.js';


export class Registerer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      fileHidden:true,
      registerPersonHidden:false,
      registerRequestHidden:false
                   };
  }
  
addNewPerson=()=>{
this.setState({
  registerPersonHidden:true,
  fileHidden:false,
  registerRequestHidden:false});
}
back=()=>{
  this.setState({
    registerPersonHidden:false,
    fileHidden:true,
    registerRequestHidden:false
  });
  }
addNewRequest=()=>{
this.setState({registerRequestHidden:true,fileHidden:false,registerPersonHidden:false})
}
  render() {
    return (
      <div>
        {this.state.fileHidden && (
          <File
                
                addNewPerson={this.addNewPerson}
                addNewRequest={this.addNewRequest}
          ></File>)}
        
        {this.state.registerPersonHidden && (
        <RegisterPerson
             
              back={this.back}
        ></RegisterPerson>
        )}
        {this.state.registerRequestHidden &&(
        <RegisterRequest
             
              back={this.back}
        ></RegisterRequest>
        )}
      </div>
    );
  }
}

import React, { Component } from 'react';
import  {RegisterRequest}  from './RegisterRequest';
import { Register2 } from './Register2';
import { RegisterPerson } from './RegisterPerson';
import { SaveAndExit } from './saveAndExit';
import {File} from './File.js';


export class Registerer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      fileHidden:true,
      registerPersonHidden:false,
      registerRequestHidden:false,
      saveAndExit:false,
      editId:0
                   };
  }
  
addNewPerson=()=>{
this.setState({
  registerPersonHidden:true,
  fileHidden:false,
  saveAndExit:false,
  registerRequestHidden:false});
}
back=()=>{
  this.setState({
    registerPersonHidden:false,
    fileHidden:true,
    registerRequestHidden:false
    ,saveAndExit:false,
    editId:0
  });
  }
  onEdit=(item3)=>{
    this.setState({
      editId:item3,
      registerPersonHidden:true,
      fileHidden:false,
      registerRequestHidden:false
      ,saveAndExit:false
    });
  }
addNewRequest=()=>{
this.setState({registerRequestHidden:true,fileHidden:false,registerPersonHidden:false,saveAndExit:false})
}
saveAndExit=()=>{
  this.setState({registerRequestHidden:false,fileHidden:false,registerPersonHidden:false,saveAndExit:true})
}
  render() {
    return (
      <div>
        {this.state.fileHidden && (
          <File
                addNewPerson={this.addNewPerson}
                addNewRequest={this.addNewRequest}
                onEdit={this.onEdit}
                saveAndExit={this.saveAndExit}
          ></File>)}
        {this.state.registerPersonHidden && (
        <RegisterPerson
              back={this.back}
              editId={this.state.editId}
              urlEdit="customer/edit"
        ></RegisterPerson>
        )}
        {this.state.registerRequestHidden &&(
        <RegisterRequest
              back={this.back}
        ></RegisterRequest>
        
        )}
        {this.state.saveAndExit && (
        <SaveAndExit saveAndExit={this.saveAndExit}></SaveAndExit>
        )}
      </div>
    );
  }
}

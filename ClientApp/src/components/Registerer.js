import React, { Component } from 'react';
import  {RegisterRequest}  from './RegisterRequest';
import { Register2 } from './Register2';
import { RegisterPerson } from './RegisterPerson';
import {File} from './File.js';


export class Registerer extends Component {
  static displayName = Registerer.name;

  constructor(props) {
    super(props);
    this.state = { userId: 0,
                    hiddenRegister:0,
                    hiddenRegister2:1,
                    hiddenRegister3:1
                   };
  }
  getId = (childData) => {
    this.setState({userId: childData});
    if(childData>0)
    {
      this.setState({hiddenRegister:1,hiddenRegister2:0});
    }
  }
  previousePage = (childData)=>{
    this.setState({hiddenRegister2:1,hiddenRegister:0});
  }
  savedRegister2 = (childData) => {
    this.setState({userId: childData});
    if(childData>0)
    {
      this.setState({hiddenRegister3:0,hiddenRegister2:1});
    }
  }
  savedRegister3 = (childData) => {
    this.setState({userId: childData});
    if(childData>0)
    {
      this.setState({hiddenRegister:1,hiddenRegister2:0});
    }
  }

  render() {
    return (
      <div>
        <RegisterRequest></RegisterRequest>
        <RegisterPerson></RegisterPerson>
        <File></File>
      </div>
    );
  }
}

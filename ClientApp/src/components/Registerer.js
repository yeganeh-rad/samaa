import React, { Component } from 'react';
import { Register } from './Register';
import { Register2 } from './Register2';
import { Register3 } from './Register3';


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
        <Register  getId={this.getId} hidden={this.state.hiddenRegister}></Register>
        <Register2  getId={this.savedRegister2} previousePage={this.previousePage} userId={this.state.userId} hidden={this.state.hiddenRegister2}></Register2>
        <Register3 userId={this.state.userId} hidden={this.state.hiddenRegister3}></Register3>
      </div>
    );
  }
}

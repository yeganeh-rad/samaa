import React, { Component } from 'react';
import {Login} from './Login'
export class Home extends Component {
  static displayName = Home.name;
  
  componentDidMount() {
    
    document.getElementById('rooot').classList.add('rooot-bg');
  }
  componentWillUnmount() {
    document.getElementById('rooot').classList.remove('rooot-bg');
  }
  render () {
    return (
      <div>
        <Login/>
      </div>
    );
  }
}


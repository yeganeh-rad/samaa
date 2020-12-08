import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import  { Home }  from './components/Home';
import { FetchData } from './components/FetchData';
import { Registerer } from './components/Registerer';
import { Register } from './components/Register';
import { Register2 } from './components/Register2';
import  { Login }  from './components/Login';
import './custom.css'
import './font.css'

export default class App extends Component {
  static displayName = App.name;

  componentDidUpdate() {
   console.log('did update trigered');
  }
   render () {
    return (
      <div id="rooot" class="rooot">
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/registerer' component={Registerer} />
        <Route path='/register' component={Register} />
        <Route path='/register2' component={Register2} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/login' component={Login}/>
      </Layout>
      </div>
    );
  }
}

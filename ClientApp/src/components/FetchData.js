import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    console.log(forecasts);
    return (
      
      <div>
        
         <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>نام خانوادگی</th>
            <th>کد ملی</th>
            <th>تاریخ تولد</th>
            <th>محل تولد</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.name}>
              <td>{forecast.family}</td>
              <td>{forecast.nin}</td>
              <td>{forecast.birthDate}</td>
              <td>{forecast.birthCity}</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
     
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h2 id="tabelLabel" >لیست کاربران</h2>
        <p>تمام کاربران موجود در سیستم</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('person');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}

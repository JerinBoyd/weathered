import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


import { getWeather } from './services/weather';
import { isEmptyObject } from './utils';
import CurrentWeather from './CurrentWeather';


class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      lon: 0,
      // city,
      currentWeather: {},
      error: null
    };
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleLatChange(e) {
    this.setState({
      lat: +e.target.value
    });
  }
  handleLonChange(e) {
    this.setState({
      lon: +e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("jerk");
    getWeather(this.state.lat, this.state.lon)
       .then(response => {
        const currentWeather = response.data.currently;
        this.setState({
          currentWeather: currentWeather
        });
       })
       .catch(error => {
         console.log(error);
         this.setState({
           error: "Something is Broke"
         });
       });
   
    
  }

  render() {
    return (
      <div>
        <h1>Weathered</h1>
        <p>Enter info in one of the sections to get local weather!</p>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>
            Latitude:
            <input
              type="number"
              min="-90"
              max="90"
              onChange={e => this.handleLatChange(e)}
              value={this.state.lat}
              required
            />
          </label>
          <label>
            longitude:
            <input
              type="number"
              min="-180"
              max="180"
              onChange={e => this.handleLonChange(e)}
              value={this.state.lon}
              required
            />
          </label>
          <button type="submit">Get the Weather!</button>
        </form>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>
            City: 
            <input
              type="Text"/>
          </label>
          <button type="submit">Get the Weather!</button>
        </form>
        
        
        {this.state.error ? <h1>{this.state.error}</h1> : '' }
        { isEmptyObject(this.state.currentWeather) 
        ?  
        "":
        <CurrentWeather {...this.state.currentWeather}/> }
      </div>
    );
  }
}

export default App;

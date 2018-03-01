import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';


import { getWeather, getWeatherByCity } from './services/weather';
import { isEmptyObject } from './utils';
import CurrentWeather from './CurrentWeather';


class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      lon: 0,
      city: "",
      state: "",
      currentWeather: {},
      error: null
    };
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.fetchCity = this.fetchCity.bind(this);
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
  handleCityChange(e) {
    this.setState({
      city: e.target.value
    });
  }
  handleStateChange(e) {
    this.setState({
      state: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("test");
    getWeather(this.state.lat, this.state.lon,)
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
   fetchCity(e) {
     console.log('test city');
     e.preventDefault();
     getWeatherByCity(this.state.city, this.state.state)
     .then(response => {
       this.setState({lat: response.data.results[0].geometry.location.lat, 
                      lon: response.data.results[0].geometry.location.lng});
     })
     .catch(error => {
       console.log(error);
     });
   }

  render() {
    return (
      <div className='text-center content-cen border page-color jumbotron '> 
        <h1 className='title'>Weathered</h1>
        <p className='title'>Enter City and State will give you lat/lon and then Hit Get Weather! 
          (can enter lat/lon by its self) </p>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label className='title'>
            Latitude:
            <input
              type="number"
              min="-90"
              max="90"
              step="0.000000000000001"
              onChange={e => this.handleLatChange(e)}
              value={this.state.lat}
              required
            />
          </label>
          <label className='title'>
            longitude:
            <input
              type="number"
              min="-180"
              max="180"
              step="0.000000000000001"
              onChange={e => this.handleLonChange(e)}
              value={this.state.lon}
              required
            />
          </label >
          <button className='btn btn-light' type="submit">Get the Weather!</button>
        </form>
        <form onSubmit={e => this.fetchCity(e)}>
          <label className='title'>
            
            <input
            
            placeholder='City'
            className='placeholder'
              type="Text"
              onChange={e => this.handleCityChange(e)}
              value={this.state.city}
              />
          </label>
          <label className='title'>
            
          <input 
              className='input-group input-group-lg'
              placeholder='State'
              type="text"
              onChange={e => this.handleStateChange(e)}
              value={this.state.State}/>
          </label>

          <button className='btn btn-light' type="submit">Get the Weather!</button>
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

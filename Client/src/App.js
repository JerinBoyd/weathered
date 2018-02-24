import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>React-Weather</h1>
        <p>Enter your latitude and longitude to get local weather!</p>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>
            Latitude:
            <input
              type="number"
              min="-90"
              max="90"
              onChange={e => this.handleLatChange(e)}
              // value={this.state.lat}
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
              // value={this.state.lon}
              required
            />
          </label>
          <button type="submit">Get the Weather!</button>
        </form>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>
            City 
            <input
              type="Text"
              min="-90"
              max="90"
              onChange={e => this.handleLatChange(e)}
              // value={this.state.lat}
              required
            />
          </label>
          <button type="submit">Get the Weather!</button>
        </form>
        
        
        {/* {this.state.error ? <h1>{this.state.error}</h1> : '' }
        { isEmptyObject(this.state.currentWeather) 
        ?  
        "":
        <CurrentWeather {...this.state.currentWeather}/> } */}
      </div>
    );
  }
}

export default App;

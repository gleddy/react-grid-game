import React, { Component } from 'react';
import '../css/style.css';
import Game from '../components/Game';

class App extends Component {
  render() {
    return (
      <Game rows="5" cols="5"/>
    );
  }
}

export default App;

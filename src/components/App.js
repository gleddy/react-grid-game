import React, { Component } from 'react';
import '../css/style.css';
import Game from '../components/Game';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { gameId: 1 };
  }

  resetGame = () => {
    this.setState({gameId: this.state.gameId + 1});
  }

  render() {
    return (
      <Game 
        key={this.state.gameId}
        resetGame={this.resetGame}
        rows="5" 
        cols="5"/>
    );
  }

}

export default App;

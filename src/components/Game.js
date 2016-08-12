import React, { Component } from 'react';
import Cell from '../components/Cell';
import Row from '../components/Row';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      targets: this.pickRandomTargets(),
      selected: [],
      correctGuesses: 0,
      gameState: 'challenge' // challenge,play,won,lost
    }
  }

  // start the game (countdown to play)
  componentDidMount() {
    this.timerId = setTimeout(() => {
      this.setState({gameState: 'play'})
    }, 2000)
  }

  // clear timer on unmount
  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  pickRandomTargets() {
    const targetsNum = 3,
          targetsArr = [];

    for (var i = 0; i < targetsNum; i++) {
      targetsArr.push({
        r: this.getRandomArbitrary(1,5),
        c: this.getRandomArbitrary(1,5)
      });
    };

    return targetsArr;
  }

  selectCell = (r,c) => {

    this.setState({selected: this.state.selected.concat({r,c})})

    const checkGameStatus = this.state.targets.filter(cell => cell.r === r && cell.c === c);

    if(checkGameStatus.length) {
      this.setState({correctGuesses: this.state.correctGuesses + 1});
    }

    if(this.state.correctGuesses + 1 === this.state.targets.length) {
      this.endGame();
    }

  }

  showMessage = () => {
    let message;
    switch(this.state.gameState) {
      case 'challenge':
        message = 'Challenge - remember where the blue tiles are!';
        break;
      case 'won':
        message = 'You win!';
        break;
      case 'lost':
        message = 'You lost!';
        break;
      default: 
        message = 'Play! - click the tiles to guess';
    }
    return message;
  }

  startGame() {
    setTimeout(() => this.setState({gameState: 'play'}), 3000);
  }

  endGame() {
    this.setState({gameState: 'won'});
  }

  render() {

    let grid = [], row, button;

    for (let i = 0; i < this.props.rows; i++) {

      // populate cells into rows
      row = [];
      for (let j = 0; j < this.props.cols; j++) {
        const cellId = `r-${i+1}-c-${j+1}`;
        row.push(
          <Cell 
            key={cellId}
            id={cellId}
            row={i+1}
            col={j+1}
            selectCell={this.selectCell}
            selected={this.state.selected}
            targets={this.state.targets}
            gameState={this.state.gameState} />)
      };

      // populate rows into grid
      grid.push(
        <Row key={i}>
          {row}
        </Row>
      )
    };

    if(this.state.gameState === 'won' || this.state.gameState === 'lost') {
      button = <button type="button" onClick={this.props.resetGame}>Play Again?</button>;
    }

    return (
      <div className="game-container">
        {grid}
        <div className="game-footer">
          {this.showMessage()}
          <p>Correct guesses: {this.state.correctGuesses}</p>
          <p>Hidden Tiles: {this.state.targets.length}</p>
          {button}
        </div>
      </div>
    );
  }
}

export default Game;
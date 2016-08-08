import React, { Component } from 'react';
import Cell from '../components/Cell';
import Row from '../components/Row';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      targets: [ // eg { r:1,c:1 }
        { r: 1, c: 1 },
        { r: 3, c: 5 },
        { r: 5, c: 3 }
      ],
      selected: [],
      gameState: 'play' // challenge,play,won,lost
    }
  }

  selectCell = (r,c) => {
    this.setState({selected: this.state.selected.concat({r,c})})
  }

  render() {

    let grid = [], row;

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

    return (
      <div className="game-container">
        {grid}
      </div>
    );
  }
}

export default Game;
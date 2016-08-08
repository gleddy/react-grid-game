import React, { Component } from 'react';

class Cell extends Component {

  constructor(props) {
    super(props);
    this.getClassName = this.getClassName.bind(this);
  }

  isTarget() {
    const { targets } = this.props;
    return targets.filter(obj => {
      return obj.r === this.props.row && obj.c === this.props.col;
    }).length === 1;
  }

  isSelected() {
    if(this.props.gameState === 'challenge') { return; }
    const { selected } = this.props;
    return selected.filter(obj => {
      return obj.r === this.props.row && obj.c === this.props.col;
    }).length === 1;
  }

  guess = () => {
    this.props.selectCell(this.props.row, this.props.col);
  }

  getClassName() {

    let stateClass = 'unselected';

    const isTarget = this.isTarget(),
          isSelected = this.isSelected();

    if(isTarget) {
      if(this.props.gameState === 'challenge') {
        stateClass = 'target';
      }
      if(isSelected) {
        stateClass = 'correct';
      }
    } else {
      if(isSelected) {
        stateClass = 'incorrect';
      }
    }

    return 'cell ' + stateClass;
  }

  render() {
    return (
      <div className={this.getClassName()}
           onClick={this.guess}>
        {this.props.id}
      </div>
    )
  }
}

export default Cell;

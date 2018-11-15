import React, { Component } from 'react';

import CharacterForm from './components/CharacterForm';
import InitiativeList from './components/InitiativeList';

const isFormFilled = (values, requiredFields) => !requiredFields
  .map(field => values[field] ? true : false)
  .includes(false);

const requiredFields = [
  'name',
  'initiative',
];

class App extends Component {
  state = {
    characters: [],
    turn: 0,
  }

  handleSubmit = (values, actions) => {
    if (isFormFilled(values, [requiredFields])) {
      return;
    }

    const { characters } = this.state;

    this.setState({
      characters: [
        ...characters,
        {
          name: values.name,
          initiative: values.initiative,
        },
      ],
    });
    actions.resetForm();
  }

  handleNextTurn = () => {
    const { characters, turn } = this.state;
    const nextTurn = characters.length - 1 > turn ? turn + 1 : 0;
    this.setState({ turn: nextTurn });
  }

  render() {
    const { characters, turn } = this.state;

    return (
      <React.Fragment>
        <CharacterForm handleSubmit={this.handleSubmit} />
        <button onClick={this.handleNextTurn} type="button">next</button>
        <InitiativeList characters={characters} turn={turn} />
      </React.Fragment>
    );
  }
}

export default App;

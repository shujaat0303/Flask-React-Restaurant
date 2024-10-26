import React, { Component } from 'react';
import '../App.css';
import Table from '../components/Table';
import Form from '../components/Form';
import Nav from '../components/Nav'

class Home extends Component {
  state = {
    characters: [
      {
        name: '',
        job: '',
      },
    ],
    data: null, // State to hold the fetched data
  };

  // Use componentDidMount to fetch data after the component is mounted
  componentDidMount() {
    fetch('/data')
      .then((res) => res.json())
      .then((data) => {
        // Setting the fetched data to the state
        this.setState({
          data: data
          ,
        });
      });

    
      fetch('/api/characters')
      .then((res) => res.json())
      .then((data) => {
        // Setting the fetched data to the state
        this.setState({
          characters:data
          ,
        });
      });
  }

  removeCharacter = async(index) => {
    const { characters } = this.state;
    const character = characters.filter((character, i) => i === index)[0]
   
    this.setState({
      characters: characters.filter((character, i) => i !== index),
    });
    // Sending POST request with fetch API
    try {
      const response = await fetch('http://localhost:5000/api/characters', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: character.name,
          job: character.job,
        }),
      });

      // Converting response to JSON
      const result = await response.json();
      console.log('Response from server:', result);
    }
    catch (error) {
      console.error('Error posting data:', error);
    }

  };

  handleSubmit = async(character) => {
    this.setState({ characters: [...this.state.characters, character] });

    // Sending POST request with fetch API
    try {
      const response = await fetch('http://localhost:5000/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: character.name,
          job: character.job,
        }),
      });

      // Converting response to JSON
      const result = await response.json();
      console.log('Response from server:', result);
    }
    catch (error) {
      console.error('Error posting data:', error);
    }

  };

  render() {
    const { characters, data } = this.state;
    console.log(characters)
    return (
      <div className="App">
        <Nav/>
        <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
        {data && (
          <div>
            <h3>Fetched Data:</h3>
            <p>Data: {data.message}</p>
            
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default Home;

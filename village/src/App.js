import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';
import Nav from './components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    this.getSmurfs()
  }

  getSmurfs = () => {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => {
        this.setState({ smurfs: response.data })
      })
      .catch(err => console.log(err))
  }

  handleSubmit = arr => {
    this.setState({ smurfs: arr })
  }

  handleDelete = smurf => {
    axios
      .delete(`http://localhost:3333/smurfs/${smurf}`)
      .then(response => {
        this.setState({ smurfs: response.data })
      })
      .catch(err => console.log(err))
  }

  render() { console.log(this.state.smurfs)
    return (
      <div className="App">
        <Route path = "/" render = { props => 
          <Nav 
            goBack = { this.getSmurfs }
          /> } 
        />
        <Route exact path = "/smurf-form" exact render = { props => 
          <SmurfForm 
            {...props}
            btn = { 'Add to the village' }
            submit = { this.handleSubmit }
            update = { false }
          /> } 
        />
        <Route exact path="/smurfs/"  exact render = { props => 
          <Smurfs 
            {...props}
            smurfs={this.state.smurfs}
          /> } 
        />
        <Route path="/smurfs/:id" render = { props => 
          <Smurf 
            {...props}
            smurfs = { this.state.smurfs }
            delete = { this.handleDelete }
            submit = { this.handleSubmit }
          /> } 
        />
      </div>
    );
  }
}

export default App;

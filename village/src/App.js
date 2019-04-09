import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/Form/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf/Smurf';
import Nav from './components/Nav';
import smurfFound from './components/getSmurfs';
import NoSmurfs from './components/Smurf/NoSmurfs';
import checkSmurf from './components/checkSmurf';

const CheckSmurfs = smurfFound(NoSmurfs)
const RenderSmurfs = CheckSmurfs(Smurfs)

const CheckSmurf = checkSmurf(NoSmurfs)
const RenderSmurf = CheckSmurf(Smurf)

class App extends Component {
  state = {
    smurfs: []
  };

  getSmurfs = (smurfs) => {
    this.setState({ smurfs: smurfs })
  }

  handleSubmit = arr => {
    this.setState({ smurfs: arr })
  }

  render() {
    return (
      <div className="App">
        <Route path = "/" component = { Nav } 
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
          <RenderSmurfs 
            {...props}
            getSmurfs = { this.getSmurfs }
            smurfs = { this.state.smurfs }
          /> } 
        />
        <Route path="/smurfs/:id" render = { props => 
          <RenderSmurf 
            {...props}
            submit = { this.handleSubmit }
          /> } 
        />
      </div>
    );
  }
}

export default App;

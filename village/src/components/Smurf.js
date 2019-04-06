import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Form from './SmurfForm';

class Smurf extends Component {
  state = {
    smurf: {}
  }

  componentDidMount() {
    this.getSmurf();
  }

  delete = (event, id) => {
    event.preventDefault()
    this.props.delete(id);
    this.props.history.push('/smurfs/')
  }

  getSmurf = () => { 
    axios
      .get('http://localhost:3333/smurfs/')
      .then(response => {
        const smurf = response.data.find(smurf => `${smurf.id}` === this.props.match.params.id)
        console.log(smurf)
        this.setState({ smurf: smurf === undefined ? {} : smurf, noSmurf: smurf === undefined ? true : false })
      })
      .catch(err => console.log(err))

      this.props.history.push(`/smurfs/${this.props.match.params.id}`)
  }

  render() { console.log(this.state.noSmurf)
    return (
      <React.Fragment>
        { this.state.noSmurf ? <NoSmurfFound {...this.props} smurf = { this.state.smurf } getSmurf = { this.getSmurf } /> : <SmurfFound {...this.props} smurf = { this.state.smurf } getSmurf = { this.getSmurf } /> }
      </React.Fragment>
    );
  };
 }

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

const SmurfFound = props => {
  const { name, height, age, id } = props.smurf
  return (
    <React.Fragment>
      <Container>
        <h3>{name}</h3>
        <strong>{height} tall</strong>
        <p>{age} smurf years old</p>
        <button onClick = { event => props.delete(event, id) }>Delete Smurf</button>
      </Container>
      <Form 
        {...this.props}
        btn = { 'Update Smurf' }
        id = { props.match.params.id }
        getSmurf = { props.getSmurf }
        update = { true }
      />
    </React.Fragment>
  );
}

const NoSmurfFound = props => {
  const { name, height, age, id } = props.smurf
  return (
    <React.Fragment>
      <h3>No Smurf Found!</h3>
      <p> Would you like to add one?</p>
      <Form 
        {...this.props}
        btn = { 'Add to the village' }
        id = { props.match.params.id }
        getSmurf = { props.getSmurf }
        update = { false }
      />
    </React.Fragment>
  );
}

const Container = styled.div`
  border: 1px solid gray;
  padding: 20px
`;

export default Smurf;


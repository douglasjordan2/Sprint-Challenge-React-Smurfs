import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  addSmurf = (event, update) => {
    event.preventDefault();
    // add code to create the smurf using the api

    if(update) {
      axios
        .put(`http://localhost:3333/smurfs/${this.props.id}`, this.state)
        .then(response => {
          this.props.submit(response.data)
          return this.props.getSmurf()
        })
        .catch(err => console.log(err))
    } else {
      axios
        .post('http://localhost:3333/smurfs', this.state)
        .then(response => this.props.submit(response.data))
        .catch(err => console.log(err))
    }

    this.setState({
      name: '',
      age: '',
      height: ''
    });

    if(!update) {
      this.props.history.push('/smurfs/')
    } else {
      this.props.history.push(`/smurfs/${this.props.id}`)
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <Form 
          onSubmit={ event => this.addSmurf(event, this.props.update) }
          show = { true }
        >
          <Input
            type="text"
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <Input
            type="text"
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <Input
            type="text"
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <Submit type="submit" value = { this.props.btn } />
        </Form>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100vw;
  margin-top: 20px;
`;

const Form = props => { 
  const NoForm = styled.form`
  display: none;
  flex-direction: column;
  align-items: center;
  width: 200px;
  border: 2px solid black;
  margin: 0 auto;
  padding: 10px;
`;

  const ShowForm = styled(NoForm)`
    display: flex;
  `;

  return (
    <React.Fragment>
    { props.show ? <ShowForm>{ props.children }</ShowForm> : <NoForm>{ props.children }</NoForm> }
    </React.Fragment> 
  );
}
const Input = styled.input`
  margin: 2px
`;

const Submit = styled(Input)`
  width: 100px;
  padding: 10px 0;
`;

export default SmurfForm;

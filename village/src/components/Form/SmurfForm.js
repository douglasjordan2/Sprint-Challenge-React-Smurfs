import React, { Component } from 'react';
import axios from 'axios';
import { Container, Input, Submit, Form } from './styles';
import SingleInput from './SingleInput';

class SmurfForm extends Component {
  state = {
    smurf: {
      name: '',
      age: '',
      height: ''
    }
  }

  componentDidMount() {
    if(this.props.update) {
      this.setState({ smurf: this.props.smurf })
    }
  }

  addSmurf = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3333/smurfs', this.state.smurf)
      .then(response => {
        this.props.submit(response.data)
      })
      .catch(err => console.log(err))

    this.setState({
      smurf: {
        name: '',
        age: '',
        height: ''
      }
    });

    this.props.history.push(`/smurfs/`)
  }

  handleChange = event => {
    event.persist();
    let value = event.target.value;
    this.setState(prevState => ({
      smurf: {...prevState.smurf, [event.target.name]: value}
    }))
  };

  render() {
    return (
      <Container>
        { this.props.singleInput ? 
          <React.Fragment>
            { this.props.inputs.map(item => (
              <SingleInput 
                type="text"
                name = { item.name }
                value = { item.value }
                changeHandler = { this.props.changeHandler }
                submit = { this.props.submit }
              />
            )) }
          </React.Fragment>
        :
          <Form onSubmit = { event => this.addSmurf(event) }>
            <Input 
              type="text"
              name="name"
              placeholder="Name"
              value = { this.state.smurf.name }
              onChange = { event => this.handleChange(event) }
            />
            <Input 
              type="text"
              name="age"
              placeholder="Age"
              value = { this.state.smurf.age }
              onChange = { event => this.handleChange(event) }
            />
            <Input 
              type="text"
              name="height"
              placeholder="height"
              value = { this.state.smurf.height }
              onChange = { event => this.handleChange(event) }
            />
            <Submit type="submit"/>
          </Form>
        }
      </Container>
    );
  }
}

export default SmurfForm;

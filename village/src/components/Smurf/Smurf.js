import React, { Component } from 'react';
import axios from 'axios';
import Form from '../Form/SmurfForm';


class Smurf extends Component {
  state = {
    smurf: {
      name: '',
      age: '',
      height: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs/')
      .then(response => {
        const smurf = response.data.find(smurf => `${smurf.id}` === this.props.match.params.id)
        this.setState({ smurf: smurf })
      })
      .catch(err => console.log(err))

    this.props.history.push(`/smurfs/${this.props.match.params.id}`)
  }

  changeHandler = event => {
    event.persist();
    let value = event.target.value

    this.setState(prevState => ({
      smurf: {
        ...prevState.smurf,
        [event.target.name]: value
      }
    }))
  }

  handleUpdate = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:3333/smurfs/${this.props.match.params.id}`, this.state.smurf)
      .then(response => {
        this.props.submit(response.data)
      })
      .catch(err => console.log(err))

      this.props.history.push(`/smurfs/${this.props.match.params.id}`)
  }

  handleDelete = (event, id) => {
    event.preventDefault();
    
    axios
      .delete(`http://localhost:3333/smurfs/${id}`, this.state.smurf)
      .then(response => {
        this.props.submit(response.data)
      })
      .catch(err => console.log(err))

      this.props.history.push(`/smurfs/`)
  }

  render() {
    const { name, age, height, id } = this.state.smurf
    return (
      <React.Fragment>
        <Form
          inputs = {[
            {
              name: "name",
              value: name
            },
            {
              name: "age",
              value: age
            },
            {
              name: "height",
              value: height
            }
          ]}
          singleInput = { true }
          changeHandler = { this.changeHandler }
          submit = { this.handleUpdate }
        />
        <button 
          onClick = { event => this.handleDelete(event,id) }
        >
          Delete Smurf
        </button>
      </React.Fragment>
    );
  };
}      

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;
import React, { Component } from 'react';
import axios from 'axios';

const checkSmurf = NoSmurf => Smurf => class extends Component {
  state = {
    smurf: 'none'
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs/')
      .then(response => {
        const smurf = response.data.find(smurf => `${smurf.id}` === this.props.match.params.id)
        console.log(response.data.length)
        if(response.data.length > 0) {
          this.setState({ smurf: smurf })
        }
      })
      .catch(err => console.log(err))

    this.props.history.push(`/smurfs/${this.props.match.params.id}`)
  }

  render() { console.log(this.state.smurf)
    return (
      <React.Fragment>
        { this.state.smurf === 'none' ? 
          <NoSmurf /> 
        : 
          <Smurf 
            {...this.props}
            smurf = { this.state.smurf }
          /> 
        }
      </React.Fragment>
    );
  }
}

export default checkSmurf;
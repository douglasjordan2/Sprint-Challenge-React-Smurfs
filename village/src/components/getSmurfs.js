import React, { Component } from 'react';
import axios from 'axios'

const smurfFound = NoSmurfs => Smurfs => class extends Component {
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs/')
      .then(response => {
        console.log(response)
        this.props.getSmurfs(response.data)
      })
      .catch(err => console.log(err))
  }

  render() { console.log(this.props)
    return (
      <React.Fragment>
        { this.props.smurfs.length > 0 ? <Smurfs
          {...this.props} 
          smurfs = { this.props.smurfs }
        /> : <NoSmurfs /> }
      </React.Fragment>
    );
  }
}

export default smurfFound
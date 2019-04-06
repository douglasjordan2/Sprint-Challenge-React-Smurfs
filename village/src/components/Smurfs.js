import React, { Component } from 'react';
import styled from 'styled-components';

class Smurfs extends Component {
  goToItem = (event, smurf) => {
    event.preventDefault();
    this.props.history.push(`/smurfs/${smurf}`)
  }

  render() {
    return (
      <Container>
        <h1>Smurf Village</h1>
        <ul>
          {this.props.smurfs.map(smurf => {
            return (
              <li onClick = { event => this.goToItem(event, smurf.id) }>
                <Smurf>{ smurf.name }</Smurf>
              </li>
            );
          })}
        </ul>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const Smurf = styled.div`
  cursor: pointer;
  border: 2px solid black;
  padding: 10px 20px;
  margin: 5px;

  :hover {
    color: white;
    background: black;
  }
`;

Smurf.defaultProps = {
 smurfs: [],
};

export default Smurfs;

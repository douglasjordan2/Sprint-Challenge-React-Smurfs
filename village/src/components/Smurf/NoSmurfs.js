import React from 'react';

export default function NoSmurfs (props) {
  return (
    <React.Fragment>
      <h3>No Smurf Found!</h3>
      <p> Would you like to add one?</p>
      { props.children }
    </React.Fragment>
  );
}
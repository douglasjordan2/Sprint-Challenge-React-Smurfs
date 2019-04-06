import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Nav() {

  const Nav = styled.div`
  margin: 10px
`;

  return (
    <Nav> 
      <Link to = "/smurfs/">Smurfs</Link> | <Link to = "/smurf-form/">Add Smurf</Link>
    </Nav>
  )
}

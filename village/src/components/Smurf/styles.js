import React from 'react';
import styled from 'styled-components';

export const Info = props => {
  return (
    <div onClick = { event => props.updateItem(event) }>
      { props.content }
    </div>
  );
}

export const Container = styled.div`
  border: 1px solid gray;
  padding: 20px
`;

export const Buttons = styled.div`
  display: flex;
`;
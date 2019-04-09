import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  margin-top: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin: 0 auto;
`;

export const Input = styled.input`
  margin: 2px
  width: 100%;
`;

export const Submit = styled(Input)`
  width: 100px;
  padding: 5px 0;
`;


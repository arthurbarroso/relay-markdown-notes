import styled from 'styled-components';
import { darken } from 'polished';
import { Animated } from 'react-animated-css';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled(Animated)`
  margin-top: 20%;
  width: 100%;
  max-width: 315px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size: 14px;
    margin-top: 2%;
    color: #fff;
    font-weight: bold;
  }

  input {
    background: #f5f5f5;
    border: 0;
    border-radius: 2%;
    width: 100%;
    height: 46px;
    padding: 0 4%;
    margin-top: 1%;
    ::placeholder {
      color: #333;
    }
  }

  button {
    width: 100%;
    margin-top: 4%;
    height: 46px;
    border-radius: 2%;
    color: #333;
    background: #f5f5f5;
    padding: 0 4%;
    border: 0;
    text-transform: uppercase;

    &:hover {
      background: ${darken(0.09, '#f5f5f5')};
    }
  }

  a {
    color: #fff;
    margin-top: 3%;
  }
`;

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

export const Wrapper = styled(Animated)`
  margin-top: 20%;
  max-width: 357px;

  input {
    width: 100%;
    height: 36px;
    padding: 0 5%;
    ::placeholder {
      color: #333;
    }
  }

  button {
    margin-top: 2%;
    width: 100%;
    border-radius: 2%;
    background: #f5f5f5;
    border: 0;
    height: 40px;

    &:hover {
      background: ${darken(0.09, '#f5f5f5')};
    }

    h1 {
      font-size: 18px;
    }
  }

  .loadbutton {
    height: 46px;
  }
`;

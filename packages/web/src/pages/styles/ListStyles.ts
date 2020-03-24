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

export const Content = styled.div`
  background: #f5f5f5;
  width: 100%;
  max-width: 420px;
  margin-top: 15%;
  display: flex;
  flex-direction: column;
`;

export const EditorWrapper = styled.div`
  @media (min-width: 600px) {
    flex-direction: row;
    padding: 0 5%;

    .wrapper {
      width: 50%;
      height: 100%;
    }

    .prevwrapper {
      width: 50%;
      margin-left: 10%;
      padding: 1% 2%;
    }
  }

  width: 100%;
  display: flex;
  flex-direction: column;

  .wrapper {
    margin-top: 10%;

    input {
      width: 100%;
      margin-bottom: 2%;
      border-radius: 2%;
      padding: 0 3%;
      ::placeholder {
        color: #333;
      }
    }

    button {
      background: #f5f5f5;
      width: 100%;
      margin-top: 2%;
      border-radius: 2%;
      border: 0;
      text-transform: uppercase;
      font-weight: bold;
    }
  }

  .prevwrapper {
    background: #f5f5f5;
    border-radius: 2%;
    margin-top: 10%;
    height: 100%;
    padding: 1% 2%;
    margin-bottom: 10%;
  }
`;

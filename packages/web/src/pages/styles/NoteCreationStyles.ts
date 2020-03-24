import styled from 'styled-components';
import { Animated } from 'react-animated-css';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EditorWrapper = styled(Animated)`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  border-radius: 2%;
  padding: 2% 5%;
  margin-bottom: 10%;

  input {
    width: 100%;
    margin-bottom: 4%;
    border-radius: 4%;
    border: 0;
    padding: 0 3%;
    height: 46px;
    ::placeholder {
      color: #333;
    }
  }

  .wrapper {
    max-width: 420px;
  }

  .buttonwrapper {
    width: 100%;
    margin-top: 5%;
    border-radius: 2%;
    border: 0;
    font-weight: bold;
    background: #ff4c4c;
    height: 46px;
    color: #f5f5f5;
  }

  .backbuttonwrapper {
    width: 100%;
    margin-top: 2%;
    border-radius: 2%;
    border: 0;
    font-weight: bold;
    background: none;

    &:hover {
      color: #ff4c4c;
    }
  }
`;

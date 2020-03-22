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

export const CustomAnimatedTitle = styled(Animated)`
  margin-top: 20%;

  h1 {
    @media (min-width: 800px) {
      font-size: 100px;
    }
    color: #fff;
    font-size: 50px;
    font-weight: bold;
  }
`;

export const CustomAnimatedDescription = styled(Animated)`
  @media (min-width: 800px) {
    width: 70%;
    line-height: 1.6;
  }
  font-size: 18px;
  color: #f5f5f5;
  text-align: center;
`;

export const CustomAnimatedButton = styled(Animated)`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  a {
    width: 100%;
    margin-left: 2%;
    margin-top: 6%;

    @media (max-width: 600px) {
      min-width: 100%;
      margin-right: 8%;
    }

    button {
      width: 100%;
      height: 46px;
      border-radius: 2%;
      color: #333;
      background: #fff;
      padding: 0 4%;
      border: 0;
      text-transform: uppercase;

      &:hover {
        background: ${darken(0.09, '#fff')};
      }
    }
  }
`;

/*

    button {
      @media (max-width: 600px) {
        min-width: 100%;
        margin-right: 8%;
      }
      text-transform: uppercase;
      font-weight: bold;
      margin-top: 6%;
      width: 100%;
      height: 46px;
      border-radius: 2%;
      color: #333;
      margin-left: 2%;
      background: #fff;
      padding: 0 4%;
      border: 0;

      &:hover {
        background: ${darken(0.09, '#fff')};
      }
    }
    */

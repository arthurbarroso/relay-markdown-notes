import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  CustomAnimatedTitle,
  CustomAnimatedDescription,
  CustomAnimatedButton,
} from './styles/HomeStyles';

export default function Home() {
  return (
    <Container>
      <CustomAnimatedTitle
        animationIn="bounceInLeft"
        animationOut="fadeOut"
        isVisible
      >
        <h1>marknotes</h1>
      </CustomAnimatedTitle>
      <CustomAnimatedDescription
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDelay={400}
        isVisible
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod
          quam a mauris posuere, a luctus ipsum bibendum. Phasellus sit amet
          nisi at augue condimentum posuere. Integer nec condimentum purus, quis
          blandit lorem. In vehicula aliquam dui, sed cursus tellus suscipit at.
          Pellentesque sem ante, sodales sit amet pulvinar sit amet, egestas sit
          amet lacus. Sed dignissim, leo et dapibus cursus, nibh orci mattis
          est, sit amet lobortis urna ex ac quam
        </p>
      </CustomAnimatedDescription>
      <CustomAnimatedButton
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDelay={600}
        isVisible
      >
        <Link to="/login">
          <button type="button">Login</button>
        </Link>
        <Link to="/register">
          <button type="button">Register</button>
        </Link>
      </CustomAnimatedButton>
    </Container>
  );
}

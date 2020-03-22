import React from 'react';
import { Link } from 'react-router-dom';

import { Container, FormWrapper } from './styles/LoginStyles';

export default function Login() {
  return (
    <Container>
      <FormWrapper animationIn="bounceInRight" animationOut="fadeOut" isVisible>
        <p>Username</p>
        <input type="text" placeholder="username" />
        <p>Password</p>
        <input type="password" placeholder="password" />
        <button type="button">Login</button>
        <Link to="/">Go back</Link>
      </FormWrapper>
    </Container>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import environment from '../environment';
import { TOKEN_STORAGE_CONSTANT } from '../constants';

import { Container, FormWrapper } from './styles/AuthStyles';

import {
  LoginMutationResponse,
  LoginMutation,
} from '../__generated__/LoginMutation.graphql';

const mutation = graphql`
  mutation LoginMutation($input: AuthInput!) {
    login(input: $input) {
      token
    }
  }
`;

function commit(username: string, password: string) {
  return commitMutation<LoginMutation>(environment, {
    mutation,
    variables: {
      input: { username, password },
    },
    onCompleted: (response: LoginMutationResponse, errors) => {
      if (errors) {
        // console.log(errors)
      }
      if (!response.login) {
        // console.log('erro');
      }

      const token = response.login?.token || '';
      if (token !== '') {
        localStorage.setItem(TOKEN_STORAGE_CONSTANT, token);
      }
    },
  });
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, sestPassword] = useState('');

  return (
    <Container>
      <FormWrapper animationIn="bounceInRight" animationOut="fadeOut" isVisible>
        <p>Username</p>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => sestPassword(e.target.value)}
        />
        <button type="button" onClick={() => commit(username, password)}>
          Login
        </button>
        <Link to="/register">Doesn't have an account? Register now</Link>
      </FormWrapper>
    </Container>
  );
}

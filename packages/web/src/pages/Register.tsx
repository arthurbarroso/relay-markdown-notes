import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import environment from '../environment';
import history from '../routes/history';

import { Container, FormWrapper } from './styles/AuthStyles';

import { RegisterMutation } from '../__generated__/RegisterMutation.graphql';

const mutation = graphql`
  mutation RegisterMutation($input: createUserInput!) {
    createUser(input: $input) {
      userEdge {
        node {
          username
        }
      }
    }
  }
`;

function commit(username: string, email: string, password: string) {
  return commitMutation<RegisterMutation>(environment, {
    mutation,
    variables: {
      input: { username, email, password },
    },
    onCompleted: (_, errors) => {
      if (errors) {
        // toast.error('😔 Something went wrong, please try again later');
      }
      // toast.success('🚀 Successfully registered, please sign in!');
      history.push('/login');
    },
  });
}

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, sestPassword] = useState('');
  const [email, setEmail] = useState('');

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
        <p>Email</p>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => sestPassword(e.target.value)}
        />
        <button type="button" onClick={() => commit(username, email, password)}>
          Register
        </button>
        <Link to="/login">Already have an account? Sign in!</Link>
      </FormWrapper>
    </Container>
  );
}

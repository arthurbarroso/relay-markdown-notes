import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import DefaultLayout from '../pages/_layout';

import { TOKEN_STORAGE_CONSTANT } from '../constants';

type Props = {
  component: React.ReactType;
  isPrivate?: boolean;
  exact?: boolean;
  path: string;
};

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}: Props) {
  const signed: boolean = !!localStorage.getItem(TOKEN_STORAGE_CONSTANT);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/notes" />;
  }

  const Layout = DefaultLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

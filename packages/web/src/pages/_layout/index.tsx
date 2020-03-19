import React, { Props } from 'react';

import { Container } from './styles';

export default function DefaultLayout({ children }: Props<object>) {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}

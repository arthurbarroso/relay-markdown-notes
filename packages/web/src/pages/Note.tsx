import React from 'react';
import { QueryRenderer } from 'react-relay';
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import environment from '../environment';

import { Container, Content } from './styles/ListStyles';

// import { NoteDetailQueryResponse } from './__generated__/NoteDetailQuery.graphql';

interface RelayProps {
  match: {
    params: {
      id: String;
    };
  };
}

/*
interface Renderer {
  query: NoteDetailQueryResponse;
}
*/

const NoteRenderer = (props: any) => {
  const { query } = props;
  const { note } = query;
  return (
    <Content>
      <h1>{note?.title}</h1>
      <ReactMarkdown source={note?.content} />
    </Content>
  );
};

function NoteScreen(thisProps: RelayProps) {
  const { match } = thisProps;
  const { id } = match.params;
  return (
    <Container>
      <QueryRenderer
        environment={environment}
        query={graphql`
          query NoteQuery($id: ID!) {
            note(id: $id) {
              id
              content
              title
              _id
            }
          }
        `}
        variables={{ id }}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }

          // @ts-ignore
          return <NoteRenderer query={props} />;
        }}
      />
      <Link to="/notes">
        <button type="button">BACK TO NOTE LIST</button>
      </Link>
    </Container>
  );
}

export default NoteScreen;

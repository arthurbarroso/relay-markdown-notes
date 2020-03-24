import React from 'react';
import { QueryRenderer } from 'react-relay';
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';
import { Link } from 'react-router-dom';
import * as Showdown from 'showdown';
import { Preview } from 'react-mde';
import environment from '../environment';

import { Container, Content, Wrapper } from './styles/NoteStyles';

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

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const NoteRenderer = (props: any) => {
  const { query } = props;
  const { note } = query;
  return (
    <Content>
      <h1>Note:</h1>
      <h2>{note?.title}</h2>
      <Preview
        markdown={note?.content}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        } // eslint-disable-line
        minHeight={42}
      />
    </Content>
  );
};

function NoteScreen(thisProps: RelayProps) {
  const { match } = thisProps;
  const { id } = match.params;
  return (
    <Container>
      <Wrapper animationIn="bounceIn" animationOut="fadeOut" isVisible>
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
          <button type="button" className="backbutton">
            BACK TO NOTE LIST
          </button>
        </Link>
      </Wrapper>
    </Container>
  );
}

export default NoteScreen;

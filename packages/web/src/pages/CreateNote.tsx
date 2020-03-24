import React, { useState } from 'react';
import ReactMde from 'react-mde';
import { commitMutation } from 'react-relay';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';
import * as Showdown from 'showdown';
import { Link } from 'react-router-dom';
import environment from '../environment';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Container, EditorWrapper } from './styles/NoteCreationStyles';
import history from '../routes/history';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const mutation = graphql`
  mutation CreateNoteMutation($input: createNoteInput!) {
    createNote(input: $input) {
      NoteEdge {
        node {
          id
          title
          content
        }
      }
    }
  }
`;

function commit(title: string, content: string) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { title, content },
    },
    onCompleted: (_, errors) => {
      if (errors) {
        // toast.error('😔 Something went wrong, please try again later');
        return;
      }
      // toast.success('🚀 Note created successfully!');
      history.push('/notes');
    },
  });
}

export default function CreateNote() {
  const [editorState, setEditorState] = useState('');
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  const [title, setTitle] = useState('');

  return (
    <Container>
      <EditorWrapper animationIn="bounceIn" animationOut="fadeOut" isVisible>
        <div className="wrapper">
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <ReactMde
            value={editorState}
            onChange={setEditorState}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))} //eslint-disable-line
          />

          <button
            className="buttonwrapper"
            type="button"
            onClick={() => {
              // @ts-ignore
              commit(title, editorState);
            }}
          >
            SEND
          </button>
          <Link to="/notes">
            <button className="backbuttonwrapper" type="button">
              GO BACK
            </button>
          </Link>
        </div>
      </EditorWrapper>
    </Container>
  );
}

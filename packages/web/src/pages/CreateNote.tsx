import React, { useState } from 'react';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Container, EditorWrapper } from './styles/ListStyles';

export default function CreateNote() {
  const [editorState, setEditorState] = useState('');

  return (
    <>
      <EditorWrapper>
        <div className="wrapper">
          <input type="text" placeholder="title" />
          <ReactMde
            value={editorState}
            onChange={setEditorState}
            selectedTab="write"
            disablePreview
          />
          <button
            type="button"
            onClick={() => {
              // @ts-ignore
              console.log(editorState);
            }}
          >
            SEND
          </button>
        </div>
        <div className="prevwrapper">
          <h1>Preview</h1>
          <ReactMarkdown source={editorState} />
        </div>
      </EditorWrapper>
    </>
  );
}

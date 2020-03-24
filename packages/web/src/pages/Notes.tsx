import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { createRefetchContainer, RelayRefetchProp } from 'react-relay';
import { toast } from 'react-toastify';

// @ts-ignore
import graphql from 'babel-plugin-relay/macro';

import createQueryRenderer from '../golden-stack/createQueryRenderer';

import { Notes_query } from './__generated__/Notes_query.graphql';

import { Container, Wrapper } from './styles/ListStyles';

interface RelayProps {
  query: Notes_query;
  relay: RelayRefetchProp;
  isLoading: boolean;
}

let qTerms = '';
function NoteRefetch(props: RelayProps) {
  const [terms, setTerms] = useState('');
  const [count, setCount] = useState(12);

  useEffect(() => {
    toast.info(
      "Whenever you get to the list's bottom you can scroll up to load more todos"
    );
  }, []);

  function loadMore() {
    if (!props.isLoading) {
      props.relay.refetch(
        { search: qTerms, first: count },
        null,
        () => {
          setCount(count + 3);
        },
        { force: true }
      );
    }
  }

  window.onscroll = () => {
    if (window.scrollY <= 40) {
      loadMore();
    }
  };

  useEffect(() => {
    qTerms = terms;
    loadMore();
  }, [terms]);

  return (
    <Container>
      <Wrapper animationIn="bounceIn" animationOut="fadeOut" isVisible>
        <input
          type="text"
          value={terms}
          onChange={e => setTerms(e.target.value)}
          placeholder="query by note title"
        />
        <button className="loadbutton" onClick={() => loadMore()} type="button">
          <h1>LOAD MORE NOTES</h1>
        </button>
        {props?.query.notes.edges.map(item => (
          <div key={item?.node?.id}>
            <Link to={`/note/${item?.node?.id}`}>
              <button type="button">{item?.node?.title}</button>
            </Link>
          </div>
        ))}
      </Wrapper>
    </Container>
  );
}

const NoteRefetchContainer = createRefetchContainer(
  NoteRefetch,
  {
    query: graphql`
      fragment Notes_query on Query {
        notes(first: $first, search: $search)
          @connection(key: "Refetch_notes") {
          edges {
            node {
              id
              _id
              content
              title
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
  },
  graphql`
    query NotesPaginationQuery($first: Int, $search: String) {
      ...Notes_query
    }
  `
);

const Renderer = createQueryRenderer(NoteRefetchContainer, NoteRefetch, {
  query: graphql`
    query NotesRefetchQuery($first: Int, $search: String) {
      ...Notes_query
    }
  `,
  variables: { first: 9, search: qTerms },
});

export default Renderer;

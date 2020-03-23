import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { TOKEN_STORAGE_CONSTANT } from './constants';

function fetchQuery(operation: any, variables: any) {
  return fetch("http://localhost:4000/", { //eslint-disable-line
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_CONSTANT)}` //eslint-disable-line
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;

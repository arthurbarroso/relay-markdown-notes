/* tslint:disable */
/* eslint-disable */
/* @relayHash 66f79918aaee9150cbf7937f018a00f7 */

import { ConcreteRequest } from "relay-runtime";
export type NoteQueryVariables = {
    id: string;
};
export type NoteQueryResponse = {
    readonly note: {
        readonly id: string;
        readonly content: string | null;
        readonly title: string | null;
        readonly _id: string;
    } | null;
};
export type NoteQuery = {
    readonly response: NoteQueryResponse;
    readonly variables: NoteQueryVariables;
};



/*
query NoteQuery(
  $id: ID!
) {
  note(id: $id) {
    id
    content
    title
    _id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "note",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Note",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "content",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "title",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "_id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NoteQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "NoteQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "NoteQuery",
    "id": null,
    "text": "query NoteQuery(\n  $id: ID!\n) {\n  note(id: $id) {\n    id\n    content\n    title\n    _id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '3b53296e5f48e79253ab6fe07fa5e396';
export default node;

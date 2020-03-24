/* tslint:disable */
/* eslint-disable */
/* @relayHash 31e6fcce2089269d1a12d98a3edfbac1 */

import { ConcreteRequest } from "relay-runtime";
export type createNoteInput = {
    title: string;
    content: string;
    clientMutationId?: string | null;
};
export type CreateNoteMutationVariables = {
    input: createNoteInput;
};
export type CreateNoteMutationResponse = {
    readonly createNote: {
        readonly NoteEdge: {
            readonly node: {
                readonly id: string;
                readonly title: string | null;
                readonly content: string | null;
            } | null;
        } | null;
    } | null;
};
export type CreateNoteMutation = {
    readonly response: CreateNoteMutationResponse;
    readonly variables: CreateNoteMutationVariables;
};



/*
mutation CreateNoteMutation(
  $input: createNoteInput!
) {
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "createNoteInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createNote",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "createNotePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "NoteEdge",
        "storageKey": null,
        "args": null,
        "concreteType": "NoteEdge",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "node",
            "storageKey": null,
            "args": null,
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
                "name": "title",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "content",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateNoteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateNoteMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateNoteMutation",
    "id": null,
    "text": "mutation CreateNoteMutation(\n  $input: createNoteInput!\n) {\n  createNote(input: $input) {\n    NoteEdge {\n      node {\n        id\n        title\n        content\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '96ba415949214dc1e49e2b541647422c';
export default node;

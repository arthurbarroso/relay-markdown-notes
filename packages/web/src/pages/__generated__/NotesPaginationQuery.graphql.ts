/* tslint:disable */
/* eslint-disable */
/* @relayHash 85e59c3b41e85b7a2c96874922d78495 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NotesPaginationQueryVariables = {
    first?: number | null;
    search?: string | null;
};
export type NotesPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"Notes_query">;
};
export type NotesPaginationQuery = {
    readonly response: NotesPaginationQueryResponse;
    readonly variables: NotesPaginationQueryVariables;
};



/*
query NotesPaginationQuery(
  $first: Int
  $search: String
) {
  ...Notes_query
}

fragment Notes_query on Query {
  notes(first: $first, search: $search) {
    edges {
      node {
        id
        _id
        content
        title
        __typename
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "search",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NotesPaginationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "Notes_query",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NotesPaginationQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "notes",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "NoteConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "NoteEdge",
            "plural": true,
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
                    "name": "_id",
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
                    "name": "__typename",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cursor",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pageInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "PageInfoExtended",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "hasNextPage",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "endCursor",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "notes",
        "args": (v1/*: any*/),
        "handle": "connection",
        "key": "Refetch_notes",
        "filters": [
          "search"
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "NotesPaginationQuery",
    "id": null,
    "text": "query NotesPaginationQuery(\n  $first: Int\n  $search: String\n) {\n  ...Notes_query\n}\n\nfragment Notes_query on Query {\n  notes(first: $first, search: $search) {\n    edges {\n      node {\n        id\n        _id\n        content\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '2b9da1a85fdb59e6844d2cdb4b446fec';
export default node;

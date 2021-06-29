/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudy = /* GraphQL */ `
  query GetStudy($id: ID!) {
    getStudy(id: $id) {
      id
      studyUID
      json
      createdAt
      updatedAt
    }
  }
`;
export const listStudys = /* GraphQL */ `
  query ListStudys(
    $filter: ModelStudyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        studyUID
        json
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

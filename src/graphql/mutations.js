/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStudy = /* GraphQL */ `
  mutation CreateStudy(
    $input: CreateStudyInput!
    $condition: ModelStudyConditionInput
  ) {
    createStudy(input: $input, condition: $condition) {
      id
      studyUID
      json
      createdAt
      updatedAt
    }
  }
`;
export const updateStudy = /* GraphQL */ `
  mutation UpdateStudy(
    $input: UpdateStudyInput!
    $condition: ModelStudyConditionInput
  ) {
    updateStudy(input: $input, condition: $condition) {
      id
      studyUID
      json
      createdAt
      updatedAt
    }
  }
`;
export const deleteStudy = /* GraphQL */ `
  mutation DeleteStudy(
    $input: DeleteStudyInput!
    $condition: ModelStudyConditionInput
  ) {
    deleteStudy(input: $input, condition: $condition) {
      id
      studyUID
      json
      createdAt
      updatedAt
    }
  }
`;

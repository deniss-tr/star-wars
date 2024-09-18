import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetAllCharacters($after: String) {
    allPeople(after: $after) {
      people {
        id
        name
        birthYear
      }
    }
  }
`;

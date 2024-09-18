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

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    person(id: $id) {
      name
      birthYear
      gender
      height
      mass
      species {
        name
        classification
        designation
        averageHeight
        averageLifespan
        eyeColors
        hairColors
        language
      }
      homeworld {
        name
        diameter
        rotationPeriod
        orbitalPeriod
        gravity
        population
        climates
        terrains
      }
      filmConnection {
        films {
          title
          director
          episodeID
          releaseDate
        }
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser(
      $name: String!
      $email: String!
      $password: String
    ) {
      createUser(
        name: $name
        email: $email
        password: $password
      ) {
        id
      }
    }
`;
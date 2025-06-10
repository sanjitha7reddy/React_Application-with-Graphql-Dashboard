import { gql } from '@apollo/client';

// Register mutation with confirmed true and role (pass role ID or name)
export const REGISTER_USER = gql`
  mutation RegisterUser($input: UsersPermissionsRegisterInput!) {
  register(input: $input) {
    jwt
    user {
      id
      username
      email
    }
  }
}

`;

// Login mutation

export const LOGIN_USER_ALT = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
        confirmed
        blocked
        role {
          id
          name
          description
          type
        }
      }
    }
  }
`;

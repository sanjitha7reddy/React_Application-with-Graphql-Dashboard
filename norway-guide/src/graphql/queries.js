// queries.js
import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      role {
        name
      }
    }
  }
`;

// ✅ Replaced with correct query
export const GET_USER_DBS = gql`
  query GetUserDbs {
    userDbs {
      Name
      email
      DOB
      phone
      is_active
      createdAt
      updatedAt
    }
  }
`;

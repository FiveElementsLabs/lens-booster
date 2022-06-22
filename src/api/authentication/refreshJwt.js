import { gql } from '@apollo/client';
import ApolloClient from '../../lib/ApolloClient';

const REFRESH_AUTHENTICATION = `
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const refreshJwt = (refreshToken) => {
  return ApolloClient.mutate({
    mutation: gql(REFRESH_AUTHENTICATION),
    variables: {
      request: {
        refreshToken,
      },
    },
  });
};

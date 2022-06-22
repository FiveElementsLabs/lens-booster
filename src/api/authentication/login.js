import { gql } from '@apollo/client';
import ApolloClient from '../../lib/ApolloClient';
import { checkJwtExpiration, prettyJSON } from '../../lib/Helpers.js';
import { getAuthenticationToken, setAuthenticationToken, setRefreshToken } from '../../lib/State.js';

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const generateChallenge = (address) => {
  return ApolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const authenticate = (address, signature) => {
  return ApolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

export const login = async (address, signer) => {
  console.log('check expiration: ', await checkJwtExpiration());
  console.log('auth token: ', getAuthenticationToken());
  console.log('already logged in?: ', await checkJwtExpiration());

  if (await checkJwtExpiration()) {
    return {
      message: 'Already logged in',
      token: getAuthenticationToken(),
    };
  }

  try {
    // We request a challenge from the server.
    console.log('address', address);
    const challengeResponse = await generateChallenge(address);
    console.log('challengeResponse', challengeResponse);

    // We sign the text with the wallet.
    const signature = await signer.signMessage(challengeResponse.data.challenge.text);
    console.log('signature', signature);

    const accessTokens = await authenticate(address, signature);
    console.log('accessTokens', accessTokens);

    prettyJSON('login result: ', accessTokens.data);

    setAuthenticationToken(accessTokens.data.authenticate.accessToken);
    setRefreshToken(accessTokens.data.authenticate.refreshToken);

    return {
      message: 'Login successful',
      token: accessTokens.data.authenticate.accessToken,
    };
  } catch (err) {
    console.error(err.message);
  }
};

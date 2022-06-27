import omitDeep from 'omit-deep';
import { Buffer } from 'buffer';
import {
  getAuthenticationToken,
  removeAuthenticationToken,
  getRefreshToken,
  setAuthenticationToken,
  setRefreshToken,
} from './State';
import { refreshJwt } from '../api/authentication/refreshJwt';

/*
 *  These are general helpers useful throughout the app.
 */

export const prettyJSON = (message, obj) => {
  console.log(message, JSON.stringify(obj, null, 2));
};

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const omit = (object, name) => {
  return omitDeep(object, name);
};

export const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const getPayload = async (token) => await JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
const getExpiration = async (token) => new Date((await getPayload(token)).exp * 1000);

export const checkJwtExpiration = async () => {
  if (!getAuthenticationToken()) {
    return false;
  }

  const expiration = getAuthenticationToken() ? await getExpiration(getAuthenticationToken()) : new Date();
  const expirationRefreash = getRefreshToken() ? await getExpiration(getRefreshToken()) : new Date();
  const now = new Date();
  const fiveMinute = 1000 * 60 * 5;

  if (expiration.getTime() - now.getTime() < fiveMinute) {
    removeAuthenticationToken();

    if (getRefreshToken() && expirationRefreash.getTime() - now.getTime() > 0) {
      console.log('REFRESH TOKEN EXPIRED');
      const newToken = await refreshJwt(getRefreshToken());
      setRefreshToken(newToken.data.refresh.refreshToken);
      setAuthenticationToken(newToken.data.refresh.accessToken);
      return true;
    }

    return false;
  }
  return true;
};

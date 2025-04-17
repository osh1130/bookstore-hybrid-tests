import { getJson, postJson } from '../../utils/requestHelpers';
import { API_PATHS } from '../../utils/constants';

export async function registerUser(request, user) {
  return postJson(request, API_PATHS.register, user);
}

export async function generateToken(request, user) {
  return postJson(request, API_PATHS.generateToken, user);
}
export async function getUser(request, userID, token) {
  const url = API_PATHS.getuser(userID);
  return getJson(request, API_PATHS.getuser(userID), {
    headers: { Authorization: `Bearer ${token}` }
  });
}

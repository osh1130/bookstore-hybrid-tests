import { getJson, postJson } from '../../utils/requestHelpers';
import { API_PATHS } from '../../utils/constants';

export async function registerUser(request, user) {
  return postJson(request, API_PATHS.register, user);
}

export async function generateToken(request, user) {
  return postJson(request, API_PATHS.generateToken, user);

// export async function getProfile(request, token) {
//   return getJson(request, '/Account/v1/Profile', {
//     headers: { Authorization: `Bearer ${token}` }
//   });
}

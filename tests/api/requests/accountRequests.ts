import { expectStatus, expectJsonField } from '../../utils/assertHelpers';
import { generateToken, registerUser } from '../endpoints/account';

export async function createUser(request, user) {
  const res = await registerUser(request, user);
  expectStatus(res, 201);
  const { userID } = await expectJsonField(res, 'userID');

  const tokenRes = await generateToken(request, user);
  expectStatus(tokenRes, 200);
  const { token } = await expectJsonField(tokenRes, 'token');

  return { userID, token };
}



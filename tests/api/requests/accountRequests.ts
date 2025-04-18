import { expectStatus, expectJsonField } from '../../utils/assertHelpers';
import { generateToken, registerUser, deleteUser } from '../endpoints/account';


export async function createUser(request, user) {
  const res = await registerUser(request, user);
  expectStatus(res, 201);
  const { userID } = await expectJsonField(res, 'userID');

  const tokenRes = await generateToken(request, user);
  expectStatus(tokenRes, 200);
  const { token } = await expectJsonField(tokenRes, 'token');

  return { userID, token };
}

export async function createAndDeleteUser(request, user) {
  const { userID, token } = await createUser(request,user);
  try {
    const deleteRes = await deleteUser(request, userID, token);
    expectStatus(deleteRes, 200);
    return deleteRes;
  } catch (err) {
    console.error(`Failed to delete user ${userID}:`, err);
    throw err;
  }
}


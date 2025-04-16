import {test, expect } from "../../fixtures"

test.describe('User Registration', () => {
    test('succeeds with valid input', async ({ accountApi }) => {
        const user = {
          userName: `user_${Date.now()}`,
          password: 'Secure123!',
        };

        const res = await accountApi.registerUser(user);

        expect(res.status()).toBe(201);
      
        const body = await res.json();
        expect(body).toHaveProperty('userID');
        expect(body).toHaveProperty('username', user.userName);
    });

    // test('fails with weak password', ...);
    // test('fails with duplicate username', ...);
    // test('fails with missing password', ...);
  });
  
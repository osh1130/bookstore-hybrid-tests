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

    const invalidPasswords = [
      ['too short', '123'],
      ['missing uppercase', 'secure123!'],
      ['missing number', 'Secure!@#'],
      ['missing lowercase', 'SECURE123!'],
      ['missing special char', 'Secure123'],
    ];

    test.describe('fails with weak password(1300)', () => {
      invalidPasswords.forEach(([description, password]) => {
        test(`rejects password: "${description}"`, async ({ accountApi }) => {
          const user = {
            userName: `user_${Date.now()}`,
            password,
          };
    
          const res = await accountApi.registerUser(user);
          expect(res.status()).toBe(400);
          const body = await res.json();
          expect(body).toHaveProperty('code', '1300');
          // const expectedMessage =
          // "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.";

          // expect(body.message).toBe(expectedMessage);
          expect(body.message).toContain('Passwords must');
        });
      });
    });
    
    test.describe('fails with missing required fields(1200)', () => {
      test('fails when password is missing', async ({ accountApi }) => {
        const user = {
          userName: `user_${Date.now()}`,
          // password is missing
        };
      
        const res = await accountApi.registerUser(user);
        expect(res.status()).toBe(400);
      
        const body = await res.json();
        expect(body).toHaveProperty('code', '1200');
        expect(body.message).toContain('required'); 
      });

      test('fails when username is missing', async ({ accountApi }) => {
        const user = {
          //missing,
          password:'Secure123!',
        };
      
        const res = await accountApi.registerUser(user);
        expect(res.status()).toBe(400);
      
        const body = await res.json();
        expect(body).toHaveProperty('code', '1200');
        expect(body.message).toContain('required'); 
      });
    });
    
    test('fails with duplicate username', async({ accountApi })=>{
      const user = {
        userName: process.env.USERNAME,
        password: process.env.PASSWORD,
      };
      const res = await accountApi.registerUser(user);
      expect(res.status()).toBe(406);
      const body = await res.json();
      expect(body).toHaveProperty('code','1204');
      expect(body.message).toContain('exists!');
    });
    
  });
  
import { getUser } from "../../api/endpoints/account";
import { createUser } from "../../api/requests/accountRequests";
import {test, expect } from "../../fixtures"

test.describe('User Login', () => {
    test('succeeds with valid credentials', async ({ accountApi }) => {
        const user = {
          userName: process.env.USERNAME,
          password: process.env.PASSWORD,
        };

        const res = await accountApi.generateToken(user);
        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body).toHaveProperty('status','Success');
        expect(body).toHaveProperty('result', 'User authorized successfully.');
    });

    
    test.describe('fails login with missing required fields(1200)', () => {
      test('fails login when password is missing', async ({ accountApi }) => {
        const user = {
          userName: process.env.USERNAME,
          // password is missing
        };
      
        const res = await accountApi.generateToken(user);
        expect(res.status()).toBe(400);
      
        const body = await res.json();
        expect(body).toHaveProperty('code', '1200');
        expect(body.message).toContain('required'); 
      });

      test('fails login when username is missing', async ({ accountApi }) => {
        const user = {
          //missing,
          password:process.env.PASSWORD,
        };
      
        const res = await accountApi.generateToken(user);
        expect(res.status()).toBe(400);
      
        const body = await res.json();
        expect(body).toHaveProperty('code', '1200');
        expect(body.message).toContain('required'); 
      });
    });

    test.describe('fails User authorization', () => {
        test('fails with Valid userName and wrong password', async({ accountApi })=>{
            const user = {
                userName: process.env.USERNAME,
                password: '12345',
            };
            const res = await accountApi.generateToken(user);
            expect(res.status()).toBe(200);
            const body = await res.json();
            expect(body).toHaveProperty('status','Failed');
            expect(body).toHaveProperty('result','User authorization failed.');
        });
        
        test('fails with wrong userName and Valid password', async({ accountApi })=>{
            const user = {
                userName: '1234567',
                password: process.env.PASSWORD,
            };
            const res = await accountApi.generateToken(user);
            expect(res.status()).toBe(200);
            const body = await res.json();
            console.log(body)
            expect(body).toHaveProperty('status','Failed');
            expect(body).toHaveProperty('result','User authorization failed.');
        });
    });

    test('L07 Token usability check', async ({ request }) => {
        const user = {
          userName: `user_${Date.now()}`,
          password: 'Secure123!',
        };
        const {userID, token} = await createUser(request, user);
        const res = await getUser(request,userID,token);
        
        expect(res.status()).toBe(200);
      
        const body = await res.json();
        expect(body).toHaveProperty('userId', userID);       
        expect(body).toHaveProperty('username', user.userName);
      });
  });
  
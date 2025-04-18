import { getUser } from "../../api/endpoints/account";
import { createUser } from "../../api/requests/accountRequests";
import {test, expect } from "../../fixtures"
import jwt from 'jsonwebtoken';

test.describe('User Delete', () => {
    test('A09 Delete user with valid token', async ({ accountApi,request }) => {
        const user = {
            userName: `user_${Date.now()}`,
            password: 'Secure123!',
        };
        const {userID, token} = await createUser(request, user);
    // const getres = await getUser(request,userID,token);
    // const data = await getres.json();
    // console.log('📘 getUser response:', data);
    // console.log('userId', userID);     
    // console.log('token :', token);  
    // console.log('username', user.userName);
    // const decoded = jwt.decode(token);
    // console.log('🔑 token payload:', decoded);

        const res = await accountApi.deleteUser(userID, token);
    // console.log('❗️DELETE STATUS:', res.status());
    // console.log('❗️DELETE BODY:', await res.text());
    // const getres2 = await getUser(request,userID,token);
    // const data2 = await getres2.json();
    // console.log('📘 getUser response:', data2);
        
        expect(res.status()).toBe(204);
    });

    test.describe('fails User Delete about authorized', () => {
        test('A10 Delete user without token should fail', async ({ accountApi, request }) => {
            const user = {
                userName: `user_${Date.now()}`,
                password: 'Secure123!',
            };
            const { userID } = await createUser(request, user);
            
            const invalidToken = '';
            const res = await accountApi.deleteUser(userID, invalidToken);
        
            expect(res.status()).toBe(401); // Unauthorized
            const body = await res.json();
            expect(body).toHaveProperty('code', '1200');
            expect(body.message).toMatch(/not authorized/i);
        });

        test('A11 Delete user with invalid token should fail', async ({ accountApi, request }) => {
            const user = {
                userName: `user_${Date.now()}`,
                password: 'Secure123!',
            };
            const { userID } = await createUser(request, user);
            
            const invalidToken = 'Bearer this.is.an.invalid.token';
            const res = await accountApi.deleteUser(userID, invalidToken);
        
            expect(res.status()).toBe(401); // Unauthorized
            const body = await res.json();
            expect(body).toHaveProperty('code', '1200');
            expect(body.message).toMatch(/not authorized/i);
        });
    });

    test('A12 Reject deletion of non-existing user', async ({ accountApi, request }) => {
        const user = {
            userName: `user_${Date.now()}`,
            password: 'Secure123!',
        };
        const { userID, token } = await createUser(request, user);
    
        const delRes = await accountApi.deleteUser(userID, token);
        expect(delRes.status()).toBe(204);
    
        const getRes = await getUser(request, userID, token);
        expect(getRes.status()).toBe(401); 
        const body = await getRes.json();
        expect(body).toHaveProperty('code', '1207');
        expect(body.message).toMatch(/not found/i);
    });
    
});
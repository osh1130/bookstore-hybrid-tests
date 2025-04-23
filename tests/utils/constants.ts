export const API_PATHS = {
    register: '/Account/v1/User',
    generateToken: '/Account/v1/GenerateToken',
    login: '/Account/v1/Authorized',
    books: '/BookStore/v1/Books',
    book: '/BookStore/v1/Book',
    putbook:(ISBN: string)=> `/BookStore/v1/Books/${ISBN}`,
    getuser:(userID: string) =>`/Account/v1/User/${userID}`,
    deleteuser: (userID: string) =>`/Account/v1/User/${userID}`
  };
  
  export const DEFAULT_PASSWORD = 'Secure123!';
  
  export const STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,        
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,      // Token 
    FORBIDDEN: 403,         // Logged in but no access
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
  };
  
  
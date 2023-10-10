export const GuardErrorExample = {
  noToken: {
    message: 'please provide token',
    error: 'Unauthorized',
    statusCode: 401,
  },
  tokenMismatch: {
    message: 'token not match any user',
    error: 'Forbidden',
    statusCode: 403,
  },
  notAdmin: {
    message: 'not admin',
    error: 'Forbidden',
    statusCode: 403,
  },
};

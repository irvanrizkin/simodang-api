export const PondErrorExample = {
  notFound: {
    message: 'pond not found',
    error: 'Not Found',
    statusCode: 404,
  },
  noDevice: {
    message: 'no device attached in this pond',
    error: 'Not Found',
    statusCode: 404,
  },
  notYours: {
    message: 'this pond not yours',
    error: 'Forbidden',
    statusCode: 403,
  },
  badRequest: {
    message: [
      'name should not be empty',
      'imageUrl must be a URL address',
      'isFilled must be a boolean value',
    ],
    error: 'Bad Request',
    statusCode: 400,
  },
};

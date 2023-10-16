export const DeviceErrorExample = {
  notFound: {
    message: 'device not found',
    error: 'Not Found',
    statusCode: 404,
  },
  badRequest: {
    message: [
      'id must be a string',
      'name must be a string',
      'userId must be a string',
      'masterId must be a string',
    ],
    error: 'Bad Request',
    statusCode: 400,
  },
  badRequestUpdate: {
    message: [
      'tdsHigh must be a number conforming to the specified constraints',
      'turbiditiesLow must be a number conforming to the specified constraints',
      'turbiditiesHigh must be a number conforming to the specified constraints',
      'name must be a string',
    ],
    error: 'Bad Request',
    statusCode: 400,
  },
};

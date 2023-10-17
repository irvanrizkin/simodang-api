export const MasterErrorExample = {
  notFound: {
    message: 'master not found',
    error: 'Not Found',
    statusCode: 404,
  },
  badRequest: {
    message: [
      'name must be a string',
      'simNumber must be a string',
      'userId must be a string',
    ],
    error: 'Bad Request',
    statusCode: 400,
  },
};

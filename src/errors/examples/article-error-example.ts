export const ArticleErrorExample = {
  notFound: {
    message: 'article not found',
    error: 'Not Found',
    statusCode: 404,
  },
  badRequest: {
    message: [
      'title should not be empty',
      'url should not be empty',
      'url must be a URL address',
      'image should not be empty',
      'image must be a URL address',
    ],
    error: 'Bad Request',
    statusCode: 400,
  },
};

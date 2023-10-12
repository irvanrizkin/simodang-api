export const MetricErrorExample = {
  badRequest: {
    message: [
      'timeString must be a valid ISO 8601 date string',
      'hours must be a number string',
    ],
    error: 'Bad Request',
    statusCode: 400,
  },
  badRequestAvg: {
    message: [
      'startDate must be a valid ISO 8601 date string',
      'endDate must be a valid ISO 8601 date string',
    ],
    error: 'Bad Request',
    statusCode: 400,
  },
};

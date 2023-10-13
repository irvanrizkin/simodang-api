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
  badRequestMetric: {
    message: [
      'temper_val must be a number conforming to the specified constraints',
      'ph_val must be a number conforming to the specified constraints',
      'oxygen_val must be a number conforming to the specified constraints',
      'tds_val must be a number conforming to the specified constraints',
      'turbidities_val must be a number conforming to the specified constraints',
    ],
    error: 'Bad Request',
    statusCode: 400,
  },
  masterMismatch: {
    message: 'master id not match',
    error: 'Bad Request',
    statusCode: 400,
  },
  invalidDate: {
    message: 'invalid date',
    error: 'Bad Request',
    statusCode: 400,
  },
  deviceNotFound: {
    message: 'device not found when create metric',
    error: 'Not Found',
    statusCode: 404,
  },
};

import { ProxyResult } from 'aws-lambda';

export const makeResponse = (statusCode: number, body: object): ProxyResult => ({
  statusCode,
  body: JSON.stringify(body),
});

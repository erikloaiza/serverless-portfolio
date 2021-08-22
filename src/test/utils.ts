/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * based on https://github.com/SamWSoftware/ServerlessYoutubeSeries/blob/l21-int-test/z_tests/testUtils/
 */
import {APIGatewayEvent, APIGatewayProxyResult} from 'aws-lambda';

export const generateApiGateWayEvent = ({
  body,
  method,
  path = '',
  queryStringObject,
  pathParametersObject,
  stageVariables = null,
}: {
  body?: any;
  method: string;
  path?: string;
  queryStringObject?: any;
  pathParametersObject?: any;
  stageVariables?: any;
}): APIGatewayEvent => ({
  body: body ? JSON.stringify(body) : null,
  resource: '/{proxy+}',
  path,
  httpMethod: method,
  isBase64Encoded: false,
  pathParameters: pathParametersObject || null,
  queryStringParameters: queryStringObject || null,
  multiValueQueryStringParameters: null,
  stageVariables,
  headers: {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'en-US,en;q=0.8',
    'Cache-Control': 'max-age=0',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'US',
    Host: '1234567890.execute-api.us-east-1.amazonaws.com',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Custom User Agent String',
    Via: '1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==',
    'X-Forwarded-For': '127.0.0.1, 127.0.0.2',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
  },
  multiValueHeaders: {
    Accept: [
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    ],
    'Accept-Encoding': ['gzip, deflate, sdch'],
    'Accept-Language': ['en-US,en;q=0.8'],
    'Cache-Control': ['max-age=0'],
    'CloudFront-Forwarded-Proto': ['https'],
    'CloudFront-Is-Desktop-Viewer': ['true'],
    'CloudFront-Is-Mobile-Viewer': ['false'],
    'CloudFront-Is-SmartTV-Viewer': ['false'],
    'CloudFront-Is-Tablet-Viewer': ['false'],
    'CloudFront-Viewer-Country': ['US'],
    Host: ['0123456789.execute-api.us-east-1.amazonaws.com'],
    'Upgrade-Insecure-Requests': ['1'],
    'User-Agent': ['Custom User Agent String'],
    Via: ['1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)'],
    'X-Amz-Cf-Id': ['cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA=='],
    'X-Forwarded-For': ['127.0.0.1, 127.0.0.2'],
    'X-Forwarded-Port': ['443'],
    'X-Forwarded-Proto': ['https'],
  },
  requestContext: {
    accountId: '123456789012',
    resourceId: '123456',
    stage: 'test',
    requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
    requestTime: '09/Apr/2015:12:34:56 +0000',
    requestTimeEpoch: 1428582896000,
    path: '/test/path/to/resource',
    resourcePath: '/{proxy+}',
    httpMethod: 'POST',
    apiId: '1234567890',
    protocol: 'HTTP/1.1',
    authorizer: {},
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      clientCert: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: '',
      user: null,
      userAgent: null,
      userArn: null,
    },
  },
});

export const isValidApiGatewayResponse = (
  response: APIGatewayProxyResult
): boolean => {
  const {body, statusCode} = response;

  if (!body || !statusCode) return false;
  if (typeof statusCode !== 'number') return false;
  if (typeof body !== 'string') return false;
  return true;
};

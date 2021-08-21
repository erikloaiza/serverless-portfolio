import {APIGatewayEvent, Context} from 'aws-lambda';

export const handler = (event: APIGatewayEvent, context: Context) => {
  return {
    statusCode: 200,
    headers: {'x-custom-header': 'my custom header value'},
    body: 'hello from api',
  };
};

import {APIGatewayEvent, Context} from 'aws-lambda';

import {
  viewPortfolio,
  updatePortfolio,
} from './controllers/portfolio.controller';

export const handler = async (event: APIGatewayEvent, context: Context) => {
  try {
    if (!event.queryStringParameters || !event.queryStringParameters.id)
      return {
        statusCode: 400,
        body: 'id is required',
      };

    const id = event.queryStringParameters?.id;

    switch (event.httpMethod) {
      case 'GET': {
        const portfolio = await viewPortfolio(id);
        if (!portfolio)
          return {
            statusCode: 404,
            body: 'portfolio not found',
          };
        return portfolio;
      }

      case 'PUT':
        {
          if (!event.body) throw new Error('payload is empty');
          const payload = JSON.parse(event.body);
          // updatePortfolio({id, ...payload});
        }
        break;

      default:
        break;
    }
    return {
      statusCode: 200,
      headers: {'Content-Type': 'text/html'},
      body: 's',
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

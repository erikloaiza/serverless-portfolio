import {APIGatewayEvent, APIGatewayProxyResult, Context} from 'aws-lambda';

import {
  viewPortfolio,
  updatePortfolio,
} from './controllers/portfolio.controller';

/**
 * Main handler for portfolio api , based on REST specification
 *
 * @param event the ApiGatewayEvent
 * @returns Portfolio object
 */
export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.queryStringParameters || !event.queryStringParameters.id)
      return {
        statusCode: 400,
        body: 'id is required',
      };

    const id = event.queryStringParameters?.id;

    let body;

    switch (event.httpMethod) {
      case 'GET':
        {
          const portfolio = await viewPortfolio(id);
          if (portfolio) body = JSON.stringify(portfolio);
        }
        break;

      case 'PUT':
        {
          if (!event.body)
            return {
              statusCode: 400,
              body: 'Payload is empty',
            };
          const portfolio = await updatePortfolio({
            id,
            ...JSON.parse(event.body),
          });
          if (portfolio) body = JSON.stringify(portfolio);
        }
        break;

      default:
        return {
          statusCode: 404,
          body: 'Not Found',
        };
    }

    if (!body)
      return {
        statusCode: 404,
        body: 'portfolio not found',
      };

    return {
      statusCode: 200,
      body: body,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

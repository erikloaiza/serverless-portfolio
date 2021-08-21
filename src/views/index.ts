import {APIGatewayEvent, Context} from 'aws-lambda';
import {readFileSync} from 'fs';

import App from './app';

// Example of a Proxy Integration response
export const handler = async (event: APIGatewayEvent, context: Context) => {
  try {
    const template = readFileSync(`${__dirname}/index.html`).toString();
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${App}</div>`
    );

    return {
      statusCode: 200,
      headers: {'Content-Type': 'text/html'},
      body: html,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

import path from 'path';
// eslint-disable-next-line node/no-unpublished-require
require('dotenv').config({
  path: path.resolve(__dirname + '../../../.env'),
});

//after env

import Portfolio from '../api/models/portfolio';
import {mapper} from '../api/constants';

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY)
  throw new Error(
    'Setup Environment First, see template.yml & copy environment variables to a root .env file'
  );
console.log('id', (global as any).__id);

//TODO: migrate portfolio creation to a "create" controller & setup tests based on it first

export default async () => {
  const portfolio = new Portfolio();
  portfolio.firstName = 'Jhon';
  portfolio.lastName = 'Doe';
  portfolio.description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  portfolio.profileImage = '';
  portfolio.twitterProfile = '';
  const portfolioDb = await mapper.put(portfolio);
  console.log('gg2');
  portfolioDb.id; //TODO: set as global
};

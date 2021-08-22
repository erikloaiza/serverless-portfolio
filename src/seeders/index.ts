/**
 * encapsulates all seeders and populates database seed script at package.json
 */
import path from 'path';
import PortfolioSeeder from './portfolio.seeder';
// eslint-disable-next-line node/no-unpublished-require
require('dotenv').config({
  path: path.resolve(__dirname + '../../../.env'),
});

//after env

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY)
  throw new Error(
    'Setup Environment First, see template.yml & copy environment variables to a root .env file'
  );

(async () => {
  await PortfolioSeeder();
})();

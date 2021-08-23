/**
 * encapsulates all seeders and populates database seed script at package.json
 */
import {setupEnv} from '../utils';

import PortfolioSeeder from './portfolio.seeder';
setupEnv();
(async () => {
  await PortfolioSeeder();
})();

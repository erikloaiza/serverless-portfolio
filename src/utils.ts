import path from 'path';
// eslint-disable-next-line node/no-unpublished-import
import {config} from 'dotenv';
/**
 * a helper function to be used on non SAM commands:
 * - test
 * - seed
 */
export const setupEnv = () => {
  console.log(path.resolve(__dirname + '/../.env'));
  config({
    path: path.resolve(__dirname + '/../.env'),
  });
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY)
    throw new Error(
      'Setup Environment First, see template.yml & copy environment variables to a root .env file'
    );
};

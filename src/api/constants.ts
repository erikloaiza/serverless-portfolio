import {DataMapper} from '@aws/dynamodb-data-mapper';
import DynamoDB from 'aws-sdk/clients/dynamodb';

/**
 * we hide de connetion to dynamodb and expose a DataMapper to use with models by controllers to query the database
 */
const client = new DynamoDB({region: process.env.REGION || 'us-west-2'});
export const mapper = new DataMapper({
  client,
  tableNamePrefix: process.env.NODE_ENV === 'test' ? 'test_' : undefined,
});

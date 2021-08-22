import {DataMapper} from '@aws/dynamodb-data-mapper';
import DynamoDB from 'aws-sdk/clients/dynamodb';

const client = new DynamoDB({region: process.env.REGION || 'us-west-2'});
export const mapper = new DataMapper({
  client,
  tableNamePrefix: process.env.NODE_ENV === 'test' ? 'test_' : '',
});

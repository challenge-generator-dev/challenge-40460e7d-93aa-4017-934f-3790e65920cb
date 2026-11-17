// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export class DynamoDBProvider {
  private static instance: DynamoDBDocumentClient;

  static getInstance(): DynamoDBDocumentClient {
    throw new Error('TODO(reto): getInstance');
  }
}
import dotenv from 'dotenv';

dotenv.config();

export interface AppConfig {
  port: number;
  nodeEnv: string;
  aws: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    dynamoDbTable: string;
    dynamoDbGsheetFailTable: string;
  };
  openai: {
    apiKey: string;
  };
  sharedApiKeys: string[];
}

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  aws: {
    region: process.env.DYNAMODB_REGION || 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_1 || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_1 || '',
    dynamoDbTable: process.env.DYNAMODB_TABLE || '',
    dynamoDbGsheetFailTable: process.env.DYNAMODB_GSHEET_FAIL_TABLE || '',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  sharedApiKeys: process.env.SHARED_API_KEYS
    ? process.env.SHARED_API_KEYS.split(',').map(key => key.trim())
    : [],
};

export default appConfig; 
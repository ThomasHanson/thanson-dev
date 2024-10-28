// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_REGION: string;
      AWS_SNS_TOPIC_ARN: string;
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: string;
      NEXT_PUBLIC_DATABASE_URL: string;
      PHONE_NUMBER: string;
    }
  }
  
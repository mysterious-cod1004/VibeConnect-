import "dotenv/config";
export const ENV ={
    PORT:   process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_SECRET_KEY: process.env.STREAM_SECRET_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    INNGEST_ENV_KEY: process.env.INNGEST_ENV_KEY,
    INNGEST_SIGNNING_KEY: process.env.INNGEST_SIGNNING_KEY
};
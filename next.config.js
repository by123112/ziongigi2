/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKBLAZE_KEY_ID: process.env.BACKBLAZE_KEY_ID,
    BACKBLAZE_APPLICATION_KEY: process.env.BACKBLAZE_APPLICATION_KEY,
    BACKBLAZE_BUCKET_NAME: process.env.BACKBLAZE_BUCKET_NAME,
    BACKBLAZE_ENDPOINT: process.env.BACKBLAZE_ENDPOINT,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
  },
};

module.exports = nextConfig;
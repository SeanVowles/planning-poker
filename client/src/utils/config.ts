const devConfig = {
    SERVER_URL: 'http://localhost:3100',
};

const prodConfig = {
    SERVER_URL: 'http://your-production-url.com',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;

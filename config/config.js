import dotenv from 'dotenv';
dotenv.config();

const config = {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME + '',
        password: process.env.HTTP_CREDENTIALS_PASSWORD + '',
    },
    qaseApiToken: process.env.QASE_TESTOPS_API_TOKEN,
    qaseProject: process.env.QASE_TESTOPS_PROJECT,
    qaseMode: process.env.QASE_MODE // 'testops' or 'off'
};

export default config;
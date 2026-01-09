// import dotenv from 'dotenv';
// dotenv.config();
import config from "./config";

const config = {
    use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    reporter: [
        ['list'],
        [
            'playwright-qase-reporter',
            {
                debug: true,
                testops: {
                    api: {
                        token: config.qaseApiToken,
                    },
                    project: config.qaseProject,
                    uploadAttachments: true,
                    run: {
                        complete: true,
                    },
                },
                framework: {
                    browser: {
                        addAsParameter: true,
                        parameterName: 'Browser',
                    },
                    markAsFlaky: true,
                },
            },
        ],
    ],
};
export default config;
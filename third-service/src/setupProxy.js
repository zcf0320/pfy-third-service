const { createProxyMiddleware } = require('http-proxy-middleware');
let BASE_URL = 'https://service-back.g-hcare.com/user-center/';
let SERVICE_URL = 'http://172.16.2.163:8077/market/';
switch (process.env.APP_ENV) {
    case 'prod':
        BASE_URL = 'https://service-back.g-hcare.com/user-center/';
        break;
    case 'test':
        BASE_URL = 'https://service-huanyu.g-hcare.com/user-center/';
        // SERVICE_URL = 'https://senro-tree-huanyu.g-hcare.com/'
        SERVICE_URL = 'https://senro-tree-huanyu.g-hcare.com/';
        break;
    case 'dev':
        BASE_URL = 'http://service-dev-local.huanyu.g-hcare.com/user-center/';
        // BASE_URL = 'http://172.16.2.24:8083/user-center/'
        SERVICE_URL = 'http://senro-market-local.huanyu.g-hcare.com/';
        break;
    case 'demo':
        BASE_URL = 'https://risk-mange.g-hcare.com/user-center/';
        break;
    default:
        BASE_URL = 'https://service-back.g-hcare.com/user-center/';
}
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/tApi', {
            target: BASE_URL,
            // target: 'http://111.231.91.210:8083/user-center',
            // target: 'http://192.168.200.109:8083/user-center',
            changeOrigin: true,
            pathRewrite: {
                '^/tApi/': '',
            },
            logLevel: 'debug',
        })
    );
    app.use(
        //服务市场
        '/sApi',
        createProxyMiddleware({
            target: SERVICE_URL,
            changeOrigin: true,
            pathRewrite: {
                '^/sApi/': '',
            },
            logLevel: 'debug',
        })
    );

    // if (process.env.NODE_ENV === 'dev') {

    // } else {
    //     app.use(createProxyMiddleware('/api',
    //         {
    //             target: 'http://111.231.91.210:8083/user-center',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api/': ''
    //             }
    //         }
    //     ));
    // }
};

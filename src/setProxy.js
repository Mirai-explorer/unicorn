const { createProxyMiddleware: proxy } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        proxy('/query1',{
            target: 'https://complexsearch.kugou.com/v2/search/song',
            changeOrigin: true,
            pathRewrite: { '^/query1': '' }
        }),
        proxy('/getsong1',{
            target: 'https://complexsearch.kugou.com/',
            changeOrigin: true,
            pathRewrite: { '^/getsong1': '' }
        })
    )
}

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware('/query1',{
            target: 'https://complexsearch.kugou.com/v2/search/song',
            changeOrigin: true,
            pathRewrite: { '^/query1': '' }
        }),
        createProxyMiddleware('/getsong1',{
            target: 'https://wwwapi.kugou.com/yy/index.php',
            changeOrigin: true,
            pathRewrite: { '^/getsong1': '' }
        })
    )
}

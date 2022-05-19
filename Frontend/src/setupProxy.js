// Workaround for using proxy in package.json throwing errors
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: '85.214.250.48:3128',
      changeOrigin: true,
    })
  );
};
// Workaround for using proxy in package.json throwing errors
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://us-central1-quoty-bot.cloudfunctions.net/app',
      changeOrigin: true,
    })
  );
};
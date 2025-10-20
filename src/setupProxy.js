// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000', // your backend
      changeOrigin: true,
      // secure: false, // uncomment if using https self-signed
    })
  );
};

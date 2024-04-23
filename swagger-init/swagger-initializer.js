window.onload = function() {
  const proxyUrl = '/p'
  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url: "https://petstore.swagger.io/v2/swagger.json",
    // urls: process.env.URLS,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    requestInterceptor: function(req) {
      if (!req.url.includes('http')) {
        return req;
      } else {
        req.url = proxyUrl + '/' + req.url // will change the URL used.
      }
    },
  });
};
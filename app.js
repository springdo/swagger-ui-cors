const express = require('express')
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
const cors_proxy = require('cors-anywhere');
const fs = require("fs")

// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8080;
const proxyURL = process.env.PROXY_URL | `/p`

const app = express()



console.log(`SWAGGER UI PATH :: ${pathToSwaggerUi}` )

// const indexContent = fs.readFileSync(`${pathToSwaggerUi}/index.html`)
//   .toString()
//   .replace("./swagger-initializer.js", "/swagger-init/swagger-initializer.js");


// fs.writeFile(`${pathToSwaggerUi}/index.html`, indexContent, err => {
//   if (err) {
//     console.error(err);
//   } else {
//     // file written successfully
//     console.info(`file written successfully `);
//   }
// });

const swagglesInit = fs.readFileSync(`./swagger-init/swagger-initializer.js`)
  .toString();

app.get("/swagger-init/swagger-initializer.js", (req, res) => {
  res.setHeader('content-type', 'text/plain; charset=UTF-8');
  res.send(swagglesInit)
})

let proxy = cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [] // Do not remove any headers.
});

/* Attach our cors proxy to the existing API on the /proxy endpoint. */
app.get('/p/:proxyUrl*', (req, res) => {
  console.info(`URL to proxy - ${req.url}`)
  // if (!req.url.includes('http')){
  //   req.url = `http://${host}:${port}/${req.url}`
  // }
  req.url = req.url.replace('/p/', '');
  console.info(`URL edited - ${req.url}`)
  proxy.emit('request', req, res);
});

// where the apis will be found
app.use('/api-specs', express.static('api-specs'))


app.use(express.static(pathToSwaggerUi))
app.listen(port, () => {
  console.info(`Example app listening on port ${port}`)
})

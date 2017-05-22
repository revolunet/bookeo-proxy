var express = require('express');
var cors = require('cors');
var Bookeo = require('node-bookeo').default;
var proxy = require('http-proxy-middleware');

var url = require('url');


var app = express();
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('/api', proxy({
  target: 'https://api.bookeo.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/v2' : '/v2'           // remove base path
  }
}));

const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`listening on http://127.0.0.1:${port}`);
})
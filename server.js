import express from 'express';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import signup from './routes/sign-up.js'
import bodyParser from 'body-parser';

const app = express();
const compiler = webpack(webpackConfig);

const routers = require('./db');
// const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public'));

app.post('/login',routers.findItem);
app.use('/', signup);
app.use(require('./routes/find-friends'));

app.listen(3000, function() {
  console.log("server started at http://localhost:3000");
});

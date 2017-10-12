let express = require('express');
let app = express();
let session = require('express-session');
require('env/loader').setEnv(require('./.env'));
let env = require('env');
let bodyParser = require('body-parser');
let baseDir = require('basedir');
let autoloader = require('use/autoloader');
let packagejson = require('./package');

// set globaly base directory throuh the module.
baseDir.set(__dirname);

autoloader.setBasePath(__dirname);
autoloader.setNamespaces(packagejson['namespaces']);

// routes
let api = require('./demo/routes/api');
let web = require('./demo/routes/web');

// middlewares
let templated = require('./demo/middlewares/templated');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(session({
    secret: "silenceisgold",
    resave: true,
    saveUninitialized: false
}));

app.use('/api', api);
app.use('/', [ templated ], web);

app.listen(env('port', 8080), () => {
    console.log(`Demo runs on http://localhost:${env('port', 8080)}/ !`);
});

module.exports = app;
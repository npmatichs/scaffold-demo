let route = require('express').Router();

route.get('/', (req, res, next) => res.send('Welcome to scaffold demo!!!'));

route.get('/pugtest', (req, res, next) => res.view('hello'));

module.exports = route;
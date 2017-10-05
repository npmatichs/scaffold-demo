let route = require('express').Router();

route.get('/', (req, res, next) => res.send('Welcome to scaffold demo!!!'));

module.exports = route;
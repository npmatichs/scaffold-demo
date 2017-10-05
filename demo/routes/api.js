let route = require('express').Router();

route.get('/test', (req, res, next) => res.send('This is api route'));

module.exports = route;
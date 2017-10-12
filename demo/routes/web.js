let use = require('use');
let route = require('express').Router();
let dashboard = use('App/dashboard/router');

// default routes;
route.get('/', (req, res, next) => res.view('hello'));

// scaffold routes.
route.use('dashboard', dashboard);

module.exports = route;
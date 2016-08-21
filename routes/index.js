/* eslint strict: "off" */
'use strict';
const babelify = require('babelify');
const browserify = require('browserify-middleware');
const keystone = require('keystone');

/* eslint no-unused-vars: "off" */
let importRoutes = keystone.importer(__dirname);

// Setup Route Bindings
exports = module.exports = (app) => {
  app.use('/js', browserify('./client/scripts', {
    transform: [babelify.configure({
      plugins: ['object-assign'],
    })],
  }));

  // Views
  app.use((req, res) => res.render('index'));
};

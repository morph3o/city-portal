const keystone = require('keystone');
const underscore = require('underscore');
const routes = require('./routes');

/* eslint quote-props: "off" */
keystone.init({
  'name': 'City portal',
  'brand': 'City portal',
  'less': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'jade',
  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'af3dc58353e1abbf0975b7141eeada86d90f5195b0f6ccf14f1545c67105f4518d260c45907f8' +
  '0b1552a6b5dcb75d1ca54a2434539acd528aa2bf3eb7a27c5a9'
});

keystone.import('models');

keystone.set('locals', {
  _: underscore,
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

keystone.set('routes', routes);
keystone.set('nav', {
  'users': 'users',
});

keystone.start();

/* eslint strict: "off" */
'use strict';
const keystone = require('keystone');
const transform = require('model-transform');

const Types = keystone.Field.Types;

let User = new keystone.List('User');

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(() =>	this.isAdmin);

transform.toJSON(User);

User.defaultColumns = 'name, email, isAdmin';
User.register();

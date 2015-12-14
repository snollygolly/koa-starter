"use strict";

const hbs = require('koa-hbs');
const config = require('../config.json');

hbs.registerHelper('if_eq', function(a, b, opts) {
  if(a == b) // Or === depending on your needs
    return opts.fn(this);
  else
    return opts.inverse(this);
});

hbs.registerHelper('copyright_year', function(opts) {
  return new Date().getFullYear();
});

hbs.registerHelper('get_name', function(opts) {
  return config.site.name;
});

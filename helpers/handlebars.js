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

hbs.registerHelper('get_analytics', function(opts) {
  if (config.site.analytics){
    return config.site.analytics;
  }
});

hbs.registerHelper('has_analytics', function(opts) {
  let fnTrue=opts.fn, fnFalse=opts.inverse;
  return (config.site.analytics && config.site.analytics !== false) ? fnTrue() : fnFalse();
});

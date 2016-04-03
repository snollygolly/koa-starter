"use strict";

const hbs = require("koa-hbs");
const config = require("../config.json");

hbs.registerHelper("if_eq", function if_eq(a, b, opts) {
	if (a == b) {
		return opts.fn(this);
	}
	return opts.inverse(this);
});

hbs.registerHelper("copyright_year", (opts) => {
	return new Date().getFullYear();
});

hbs.registerHelper("get_name", (opts) => {
	return config.site.name;
});

hbs.registerHelper("get_analytics", (opts) => {
	if (config.site.analytics) {
		return config.site.analytics;
	}
});

hbs.registerHelper("has_analytics", function has_analytics(opts) {
	const fnTrue = opts.fn;
	const fnFalse = opts.inverse;
	return (config.site.analytics && config.site.analytics !== false) ? fnTrue() : fnFalse();
});

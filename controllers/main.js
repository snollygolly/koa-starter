"use strict";

const config = require("../config.json");

let user = null;

module.exports.index = async(ctx) => {
	if (ctx.isAuthenticated()) {
		user = ctx.session.passport.user;
	}
	await ctx.render("index", {
		title: config.site.name,
		user: user
	});
};

"use strict";

const config = require("../config.json");

module.exports.index = async(ctx) => {
	let user;
	if (ctx.isAuthenticated()) {
		user = ctx.session.passport.user;
	}
	await ctx.render("index", {
		title: config.site.name,
		user: user
	});
};

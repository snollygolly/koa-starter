"use strict";

const config = require("../config.json");

module.exports.login = async(ctx) => {
	let user;
	if (ctx.isAuthenticated()) {
		user = ctx.session.passport.user;
	}
	await ctx.render("login", {
		user: user
	});
};

module.exports.logout = async(ctx) => {
	ctx.logout();
	await ctx.redirect("/");
};

module.exports.index = async(ctx) => {
	let user;
	if (ctx.isAuthenticated()) {
		user = ctx.session.passport.user;
	} else {
		return ctx.redirect("/");
	}
	await ctx.render("account", {
		title: config.site.name,
		user: JSON.stringify(user, null, 2)
	});
};

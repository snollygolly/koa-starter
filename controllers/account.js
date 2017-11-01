"use strict";

const config = require("../config.json");

let user = null;

module.exports.login = async(ctx) => {
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

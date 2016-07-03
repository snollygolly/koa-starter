"use strict";

const config = require("../config.json");

let user = null;

module.exports.login = function* login() {
	if (this.isAuthenticated()) {
		user = this.session.passport.user;
	}
	yield this.render("login", {
		user: user
	});
};

module.exports.logout = function* logout() {
	this.logout();
	yield this.redirect("/");
};

module.exports.index = function* index() {
	if (this.isAuthenticated()) {
		user = this.session.passport.user;
	} else {
		return this.redirect("/");
	}
	yield this.render("account", {title: config.site.name, user: JSON.stringify(user, null, 2)});
};

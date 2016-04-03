"use strict";

const config = require("./config.json");

const app = require("./index.js").app;
const passport = require("./index.js").passport;
const Router = require("koa-router");

const routes = new Router();

const main = require("./controllers/main.js");

// routes
let user = null;

routes.get("/", function* get() {
	if (this.isAuthenticated()) {
		user = this.session.passport.user;
	}
	yield this.render("index", {title: config.site.name, user: user});
});

// for passport
routes.get("/login", function* get() {
	if (this.isAuthenticated()) {
		user = this.session.passport.user;
	}
	yield this.render("login", {user: user});
});

routes.get("/logout", function* get() {
	this.logout();
	yield this.redirect("/");
});

// you can add as many strategies as you want
routes.get("/auth/github",
	passport.authenticate("github")
);

routes.get("/auth/github/callback",
	passport.authenticate("github", {
		successRedirect: "/account",
		failureRedirect: "/"
	})
);

routes.get("/account", main.account);

app.use(routes.middleware());

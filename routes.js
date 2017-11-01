"use strict";

const config = require("./config.json");

const app = require("./index.js").app;
const passport = require("./index.js").passport;
const Router = require("koa-router");

const router = new Router();

const main = require("./controllers/main.js");
const account = require("./controllers/account.js");

// routes

router.get("/", main.index);

// for passport
router.get("/login", account.login);
router.get("/logout", account.logout);
router.get("/account", account.index);

// you can add as many strategies as you want
router.get("/auth/github",
	passport.authenticate("github")
);

router.get("/auth/github/callback",
	passport.authenticate("github", {
		successRedirect: "/account",
		failureRedirect: "/"
	})
);

app.use(router.routes());
app.use(router.allowedMethods());

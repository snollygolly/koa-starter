"use strict";

const passport = require("../index.js").passport;
const config = require("../config.json");

// if we have a port other than 80, add it to our callback url
let port = "";
if (config.site.port !== 80) {
	port = `:${config.site.port}`;
}

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

const GithubStrategy = require("passport-github").Strategy;
passport.use(new GithubStrategy({
	clientID: config.site.oauth.github.clientID,
	clientSecret: config.site.oauth.github.clientSecret,
	callbackURL: `${config.site.oauth.host}${port}/auth/github/callback`
}, (token, tokenSecret, profile, done) => {
	// retrieve user ...
	done(null, profile);
}));

const Auth0Strategy = require("passport-auth0");
passport.use(new Auth0Strategy({
	domain: config.site.oauth.auth0.domain,
	clientID: config.site.oauth.auth0.clientID,
	clientSecret: config.site.oauth.auth0.clientSecret,
	callbackURL: `${config.site.oauth.host}${port}/auth/auth0/callback`
}, (accessToken, refreshToken, extraParams, profile, done) => {
	// retrieve user ...
	done(null, profile);
}));

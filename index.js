"use strict";

const config = require("./config.json");

const Koa = require("koa");
const hbs = require("koa-hbs");
const serve = require("koa-static");
const mount = require("koa-mount");

// for passport support
const session = require("koa-session");
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");

const app = new Koa();

exports.app = app;
exports.passport = passport;

// the auth model for passport support
require("./models/auth");

// misc handlebars helpers
require("./helpers/handlebars");

// trust proxy
app.proxy = true;

// sessions
app.keys = [config.site.secret];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

// statically serve assets
app.use(mount("/assets", serve("./assets")));

// load up the handlebars middlewear
app.use(hbs.middleware({
	viewPath: `${__dirname}/views`,
	layoutsPath: `${__dirname}/views/layouts`,
	partialsPath: `${__dirname}/views/partials`,
	defaultLayout: "main"
}));


// Error handling middleware
app.use(async(ctx,next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.render("error", {
			message: err.message,
			error: {}
		});
		ctx.app.emit("error", err, this);
	}
});

require("./routes");


console.log(`${config.site.name} is now listening on port ${config.site.port}`);
app.listen(config.site.port);

process.on("SIGINT", function exit() {
	process.exit();
});

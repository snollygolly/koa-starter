# :koala: koa-starter
A starter kit for a slightly opinionated [Koa](http://koajs.com/) project.

## Opinions
I built this Koa starter kit because there's a number of packages I like to use when starting a new project.  The major ones are:

* [Koa v2](http://koajs.com/)
* [Passport](http://passportjs.org/)
* [Handlebars](http://handlebarsjs.com/)
* [Bootstrap v4.2.1](http://getbootstrap.com/)
* [FontAwesome 4.7](https://fortawesome.github.io/Font-Awesome/)
* [ShipIt](https://github.com/shipitjs/shipit)

I'm also including goodies from:

* [Nodemon](https://github.com/remy/nodemon)
* [Bootstrap Social](http://lipis.github.io/bootstrap-social/)
* [Github Corners](https://github.com/tholman/github-corners)
* [Google Universal Analytics](https://www.google.com/analytics/)
* [ESLint](http://eslint.org/)
* [Auth0](https://auth0.com/)

## Prerequisites
* [Node.js](https://nodejs.org/en/) (Version 8 and up recommended, async/await support required)
* [Github Client ID and Secret](https://github.com/settings/developers) (for OAuth)
* [Auth0 Account](https://auth0.com/) (for OAuth)

### Installation

* Clone down the repository.
```
git clone https://github.com/snollygolly/koa-starter.git
```

* Install packages (from inside the koa-starter folder).
```
npm install
```

* Create your config.  There's a `config.example.json` file in the root.  Edit it to include all your values for the site and your OAuth information.  Save it as `config.json` and leave it in the root.

* If you want to use Google Analytics, set `config.site.analytics` to your Tracking ID and make sure the analytics partial (analytics.hbs) contains the correct Universal Analytics tracking code.  If you don't want to use Google Analytics, remove that property or set it to false.

* Start it up.
```
npm start
```

* Enjoy!

## Extras

While koa-starter isn't a framework, I've added a few small extras to make getting your project up and started as easy as possible.

#### Including assets from view rendering

When you render you view, you can use the following properties to link to assets.

- Scripts: This array contains scripts living in `/assets/js` that you'd like to link to.  The `.js` will be added for you.

```
await ctx.render("index", {
  title: config.site.name,
  user: user,
  scripts: ["index", "extra"]
});
```

- Vendor JavaScript: This array contains links to external files you'd like to link to.  The `.js` will not be added for you.

```
await ctx.render("index", {
  title: config.site.name,
  user: user,
  vendor_js: ["http://vendor.com/cdn/lib.min.js"]
});
```

- Vendor CSS: This array contains links to external files you'd like to link to.  The `.css` will not be added for you.

```
await ctx.render("index", {
  title: config.site.name,
  user: user,
  vendor_css: ["http://vendor.com/cdn/lib.min.css"]
});
```

#### Error Handling

Thrown errors are caught in the error handling middleware in `index.js`.  By default, all errors will render the `error.hbs` view with information about the error.  It's possible to set `ctx.state.api` equal to `true` in the controller to tell the error handling middleware that this route is an API endpoint, and the error should be sent in JSON instead of rendered as a view.

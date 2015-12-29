# :koala: koa-starter
A starter kit for a slightly opinionated [Koa](http://koajs.com/) project.

## Opinions
I built this package because there's a number of packages I like to use when starting a new project.  The major ones are:

* [Koa v1](http://koajs.com/)
* [Passport](http://passportjs.org/)
* [Handlebars](http://handlebarsjs.com/)
* [Bootstrap v3](http://getbootstrap.com/)
* [FontAwesome](https://fortawesome.github.io/Font-Awesome/)
* [ShipIt](https://github.com/shipitjs/shipit)

I'm also including goodies from:

* [Bootstrap Social](http://lipis.github.io/bootstrap-social/)
* [Github Corners](https://github.com/tholman/github-corners)
* [Google Universal Analytics](https://www.google.com/analytics/)

## Prerequisites
* [Node.js](https://nodejs.org/en/) (Version 5 and up recommended)
* [Github Client ID and Secret](https://github.com/settings/developers) (for OAuth)

### Installation

* Clone down the repository.
```
git clone https://github.com/snollygolly/koa-starter.git
```

* Install packages (from inside the koa-starer folder).
```
npm install
```

* Create your config.  There's a `config.json.example` file in the root.  Edit it to include all your values for the site and your OAuth information.  Save it as `config.json` and leave it in the root.

* If you want to use Google Analytics, set `config.site.analytics` to your Tracking ID and make sure the analytics partial (analytics.hbs) contains the correct Universal Analytics tracking code.  If you don't want to use Google Analytics, remove that property or set it to false.

* Start it up.
```
npm start
```

* Enjoy!

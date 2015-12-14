"use strict";

const config = require('../config.json');

let user = null;

module.exports.account = function* account(){
	if (this.isAuthenticated()) {
	  user = this.session.passport.user;
	}else{
		return this.redirect('/');
	}
	yield this.render('account', {title: config.site.name, user: JSON.stringify(user, null, 2)});
}

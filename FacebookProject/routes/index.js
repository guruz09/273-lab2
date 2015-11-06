
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'MyFacebook' });
};

exports.login = function(req, res){
	  res.render('loginpage', { title: 'Welcome' });
};

exports.afterlogin = function(req, res){
	  res.render('afterlogin', { title: 'MyFacebook' });
};

exports.signupsuccess = function(req, res){
	  res.render('signupsuccess', { title: 'MyFacebook' });
};

exports.logincenterpage = function(req, res){
	  res.render('logincenterpage', { title: 'MyFacebook' });
};
exports.groupspage = function(req, res){
	  res.render('groupspage', { title: 'MyFacebook' });
};
exports.loadAboutPage = function(req, res){
	  res.render('overview', { title: 'MyFacebook' });
};
exports.loadFriendsPage = function(req, res){
	  res.render('friendspage', { title: 'MyFacebook' });
};
exports.loadWorkEdu = function(req, res){
	  res.render('workeducation', { title: 'MyFacebook' });
};
exports.loadInterests = function(req, res){
	  res.render('interests', { title: 'MyFacebook' });
};
exports.loadLifeEvents = function(req, res){
	  res.render('lifeevents', { title: 'MyFacebook' });
};
exports.loadContactInfo = function(req, res){
	  res.render('contactinfo', { title: 'MyFacebook' });
};



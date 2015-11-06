var express = require('express');
var routes = require('./routes');
var index = require('./routes/index');
var groupInfo = require('./routes/groupInfo');
var userInfo = require('./routes/userInfo');
var newsFeed = require('./routes/newsFeed');
var friends = require('./routes/friends');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//var session = require('client-sessions');

var app = express();

/*app.use(session({
	cookieName: 'session',
	secret : 'myfacebook@secure',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
	resave : false,
	saveUninitialized : false,
	cookie:{maxAge : 600000,rolling : true}
})); */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);
app.get('/login', index.login);
app.post('/loginapi', userInfo.loginapi);
app.get('/afterlogin',index.afterlogin);
app.post('/signUPapi', userInfo.signUPapi);
app.get('/signupsuccess',index.signupsuccess);
app.post('/getPersonalInfoapi', userInfo.getPersonalInfoapi);
app.post('/getGroupsapi', groupInfo.getGroupsapi);
app.post('/showAllNewsFeedapi', newsFeed.showAllNewsFeedapi);
app.post('/createNewsFeedapi', newsFeed.createNewsFeedapi);
app.get('/logincenterpage', index.logincenterpage);
app.get('/groupspage', index.groupspage);
app.post('/createGroupapi', groupInfo.createGroupapi);
app.post('/showGroupMemberapi', groupInfo.showGroupMemberapi);
app.post('/showGroupMemberForOwnerapi', groupInfo.showGroupMemberForOwnerapi);
app.post('/deleteGroupMemberapi', groupInfo.deleteGroupMemberapi);
app.post('/getGroupNamesapi',groupInfo.getGroupNamesapi);
app.post('/getFriendsapi', friends.getFriendsapi);
app.post('/addGroupMemberapi', groupInfo.addGroupMemberapi);
app.get('/loadAboutPage',index.loadAboutPage);
app.get('/loadFriendsPage',index.loadFriendsPage);
app.get('/loadWorkEdu',index.loadWorkEdu);
app.get('/loadInterests',index.loadInterests);
app.get('/loadLifeEvents',index.loadLifeEvents);
app.get('/loadContactInfo',index.loadContactInfo);
app.post('/getOverviewInfoapi',userInfo.getOverviewInfoapi);
app.post('/sendfriendrequest',friends.sendFriendReqapi);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

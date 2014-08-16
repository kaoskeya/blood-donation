isAdminUser = function(userId, doc) {
	return Roles.userIsInRole(Meteor.user(), ['admin']);
}

Handlebars.registerHelper('dateFormat', function(timestamp) {
	return moment(timestamp).format("DD MMM YYYY");
});
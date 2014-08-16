Template.adminTemplate.helpers({
    isAdminUser: function() {
    	return Roles.userIsInRole(Meteor.user(), ['admin']);
    }
});


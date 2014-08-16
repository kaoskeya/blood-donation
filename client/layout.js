Template.layout.helpers({
    isAdminUser: function() {
    	return Roles.userIsInRole(Meteor.user(), ['admin']);
    },
    isDataEntryUser: function() {
    	return Roles.userIsInRole(Meteor.user(), ['dataentry']);
    }
});
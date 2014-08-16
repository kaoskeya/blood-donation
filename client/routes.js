Router.configure({
	autoRender: true,
	layoutTemplate: 'layout',
	after: function() {
		$('body,html').scrollTop(0);
		/*
		$("footer").css('position', '').css('bottom', '').css('width', '').show();
		$(document).ready(function() {
			if( $(window).height() > $("footer").position().top + $("footer").outerHeight(true) )
				$("footer").css('position', 'fixed').css('bottom', 0).css('width', '100%').show();
		});
		*/
	},
});

Router.map(function () {
	this.route('home', {
		path: '/',
		template: 'stats',
		waitOn: function() {
			return [
				this.subscribe("donors").wait(),
			]
		}
	});

	this.route('users', {
		path: '/users',
		template: 'users',
		waitOn: function() {
			return [
				//Meteor.subscribe("content"),
			]
		}
	});

	this.route('donors', {
		path: '/donors',
		template: 'donors',
		waitOn: function() {
			return [
				Meteor.subscribe("donors"),
			]
		}
	});

	this.route('donorsAdd', {
		path: '/donors/add',
		template: 'donorsAdd',
		waitOn: function() {
			return [
				//Meteor.subscribe("content"),
			]
		}
	});
});
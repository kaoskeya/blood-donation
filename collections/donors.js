Donors = new Meteor.Collection("donors", {
	schema: {
		name: {
			type: String,
			label: "Donor Name"
		},
		dob: {
			type: Date,
			label: "Date of Birth"
		},
		mobile: {
			type: String,
			label: 'Mobile Number'
		},
		bloodgroup: {
			type: String,
			allowedValues: [ 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-' ],
			label: 'Blood Group'
		},
		sex: {
			type: String,
			allowedValues: [ 'M', 'F' ]
		},
		profession: {
			type: String,
			optional: true
		}
	}
})

Donors.allow({
	insert: function(userId, doc) {
		return isAdminUser();
	},
	update: function(userId, doc) {
		return isAdminUser();
	},
	remove: function(userId, doc) {
		return isAdminUser();
	}
});
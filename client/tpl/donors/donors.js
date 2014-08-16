Template.donors.helpers({
	'donors': function() {
		return Donors.find()
	}
});

Template.donorsAdd.rendered = function() {
	AutoForm.hooks({
		donorForm: {
			onSubmit: function(insertDoc, updateDoc, currentDoc) {
			},
			onSuccess: function(operation, result, template) {
				switch(operation) {
					case 'insert': 
						toastr.success('Donor added successfully.');
						break;
					case 'update': 
						toastr.info('Donor updated successfully.');
						break;
					case 'remove': 
						toastr.info('Donor deleted successfully.');
						break;
				}
				Router.go('/donors');
			}, 
			onError: function(operation, error, template) {
				toastr.error(error);
			}
		}
	});
}
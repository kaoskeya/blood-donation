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
Template.donors.events({
	'click #downloadCSV': function(e) {
		records = Donors.find().fetch();
		csv = json2csv(
			records, 
			true, 
			true
		);
		e.target.href = "data:text/csv;charset=utf-8," + escape(csv);
		e.target.download = "donors.csv";
	}
})

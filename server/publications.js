Meteor.publish("donors", function(){
	if( this.userId )
		return Donors.find();
	else
		return false;
});
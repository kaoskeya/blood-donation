Template.stats.helpers({
	donorCount: function() {
		return Donors.find().count()
	},
});


Template.stats.rendered = function() {
	$(function () {

		Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
			return {
				radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
				stops: [
				[0, color],
					[1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
					]
				};
			});

		Deps.autorun(function(){

			bloodGroups = [ 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-' ];
			data = [];
			_.each(bloodGroups, function(group){
				data.push([
					group,
					(Donors.find({'bloodgroup': group}).count() * 100) / Donors.find().count()
					]);
			});
			console.log(data);

			$('#bloodgroupContainer').highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: 'Blood Group Distribution'
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false,
						},
						showInLegend: true
					}
				},
				series: [{
					type: 'pie',
					name: 'Blood Groups',
					data: data
				}],
				credits: false
			});

			$('#sexContainer').highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: 'Gender wise Distribution'
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false,
						},
						showInLegend: true
					}
				},
				series: [{
					type: 'pie',
					name: 'Blood Groups',
					data: [
					['Male', (Donors.find({'sex': 'M'}).count() * 100) / Donors.find().count() ],
					['Female', (Donors.find({'sex': 'F'}).count() * 100) / Donors.find().count() ],
					]
				}],
				credits: false
			});

			$('#ageContainer').highcharts({
				chart: {
					type: 'bar'
				},
				title: {
					text: 'Age wise Distribution'
				},
				xAxis: {
					categories: ['< 25', '26 to 35', '36 to 45', '46 to 55', '56+'],
					title: {
						text: null
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Donors',
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					}
				},
				tooltip: {
					valueSuffix: '%'
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: -20,
					y: 250,
					floating: true,
					borderWidth: 1,
					backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
					shadow: true
				},
				credits: {
					enabled: false
				},
				series: [{
					name: 'Male',
					data: [
						parseFloat(((Donors.find({'sex': 'M', dob: { $gt: moment().subtract(25, 'years').toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'M', dob: { $gt: moment().subtract('years', 35).toDate(), $lt: moment().subtract('years', 26).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'M', dob: { $gt: moment().subtract('years', 45).toDate(), $lt: moment().subtract('years', 36).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'M', dob: { $gt: moment().subtract('years', 55).toDate(), $lt: moment().subtract('years', 46).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'M', dob: { $lt: moment().subtract('years', 56).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
					]
				}, {
					name: 'Female',
					data: [
						parseFloat(((Donors.find({'sex': 'F', dob: { $gt: moment().subtract('years', 25).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'F', dob: { $gt: moment().subtract('years', 35).toDate(), $lt: moment().subtract('years', 26).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'F', dob: { $gt: moment().subtract('years', 45).toDate(), $lt: moment().subtract('years', 36).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'F', dob: { $gt: moment().subtract('years', 55).toDate(), $lt: moment().subtract('years', 46).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'F', dob: { $lt: moment().subtract('years', 56).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
					]
				}]
			});


});
});
}

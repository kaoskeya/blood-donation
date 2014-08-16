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
					categories: ['< 18', '19 to 30', '31 to 40', '41 to 50', '51+'],
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
						parseFloat(((Donors.find({'sex': 'M', dob: { $gt: moment().subtract(18, 'years').toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'M', dob: { $gt: moment().subtract('years', 30).toDate(), $lt: moment().subtract('years', 19).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'M', dob: { $gt: moment().subtract('years', 40).toDate(), $lt: moment().subtract('years', 31).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'M', dob: { $gt: moment().subtract('years', 50).toDate(), $lt: moment().subtract('years', 41).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'M', dob: { $lt: moment().subtract('years', 51).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
					]
				}, {
					name: 'Female',
					data: [
						parseFloat(((Donors.find({'sex': 'F', dob: { $gt: moment().subtract('years', 18).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'F', dob: { $gt: moment().subtract('years', 30).toDate(), $lt: moment().subtract('years', 19).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'F', dob: { $gt: moment().subtract('years', 40).toDate(), $lt: moment().subtract('years', 31).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'F', dob: { $gt: moment().subtract('years', 50).toDate(), $lt: moment().subtract('years', 41).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
						parseFloat(((Donors.find({'sex': 'F', dob: { $lt: moment().subtract('years', 51).toDate() }}).count() * 100) / Donors.find().count()).toFixed(2)),
					]
				}]
			});


});
});
}

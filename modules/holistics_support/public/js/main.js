var app = new Vue({
  el: '#app',
  data: {
    support_events: []
  }
})

var app2 = new Vue({
  el: '#app2',
  data: {
    deploy_events: []
  }
})

var app3 = new Vue({
	el: '#app3',
	data: {
		members: [
			{
				name: 'Hoang',
				email: 'hoang.do@holistics.io'
			},
			{
				name: 'Phien',
				email: 'phien.pham@holistics.io'
			},
			{
				name: 'Dat',
				email: 'scott.bui@holistics.io'
			},
			{
				name: 'HuyT',
				email: 'huy.tran@holistics.io'
			},
			{
				name: 'HuyV',
				email: 'huy.vu@holistics.io'
			},
			{
				name: 'Thanh',
				email: 'thanh@holistics.io'
			},
		]
	}
})

var Vue2 = new Vue({
	el: '#new_event',
	data: {
		date: '',
		description: '',
		email: '',
		members: app3.members
	},
	methods: {
		submit: function() {
			var body = {
				date: this.date,
				description: this.description,
				email: this.email
			};

			Vue.http.post('/holistics_support/events', body).then(function(data) {
				console.log(data);
			}, function(error) {
				console.log(error)
			});

			this.date = '';
			this.description = '';
			this.email = '';
			reloadSupportEvent();
			reloadDeployEvent();
		}
	}
})


function reloadSupportEvent() {
	app.support_events = []

	Vue.http.get('/holistics_support/events?q=Support', {}).then(function(data) {
		console.log(data);

		for(var i=0; i<data.body.length; i++)
		{
			var item = data.body[i];

			item.start.day = moment(item.start.date).format('dddd');

			app.support_events.push(item)
		}

		//app.events = data.body;
	}, function(error) {
		console.log(error)
	});
}

function reloadDeployEvent() {
	app2.deploy_events = []

	Vue.http.get('/holistics_support/events?q=Deploy', {}).then(function(data) {
		console.log(data);

		for(var i=0; i<data.body.length; i++)
		{
			var item = data.body[i];

			item.start.day = moment(item.start.date).format('dddd');

			app2.deploy_events.push(item)
		}

		//app.events = data.body;
	}, function(error) {
		console.log(error)
	});
}



window.onload = function() {
	reloadSupportEvent();
	reloadDeployEvent();
}
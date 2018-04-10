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

var App_InsertEvent = new Vue({
	el: '#new_event',
	data: {
		next_date: '',
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

var App_Notifications = new Vue({
	el: '#notifications',
	data: {
		has_notification: false,
		notifications: []
	}
})

function getNotifications() {
	Vue.http.get('/holistics_support/notifications', {}).then(function(data) {
		console.log(data);

		App_Notifications.notifications = data.notifications;
		if(data.notifications && data.notifications.length > 0)
			App_Notifications.has_notification = true;

	}, function(error) {
		console.log(error)
	});
}

function reloadSupportEvent() {
	app.support_events = []

	Vue.http.get('/holistics_support/events?q=Support&t='+(new Date()), {}).then(function(data) {
		console.log(data);

		for(var i=0; i<data.body.length; i++)
		{
			var item = data.body[i];

			item.start.day = moment(item.start.date).format('dddd');

			app.support_events.push(item)
		}

		//app.events = data.body;

		// Identify the last date
		var lastDate = data.body[data.body.length-1].start.date;
		var nextDate;

		if(moment(lastDate).format('dddd') == "Friday")
			nextDate = moment(lastDate).add(3, 'd');
		else
			nextDate = moment(lastDate).add(1, 'd');

		App_InsertEvent.next_date = moment(nextDate);
		App_InsertEvent.date = App_InsertEvent.next_date.format('YYYY-MM-DD');

	}, function(error) {
		console.log(error)
	});
}

function reloadDeployEvent() {
	app2.deploy_events = []

	Vue.http.get('/holistics_support/events?q=Deploy&t='+(new Date()), {}).then(function(data) {
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
	getNotifications();
}
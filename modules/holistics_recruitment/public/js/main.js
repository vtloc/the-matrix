var app = new Vue({
  el: '#app',
  data: {
    interview_events: []
  }
})


function getNotifications() {
	Vue.http.get('/holistics_recruitment/events', {}).then(function(data) {
		console.log(data);

		App_Notifications.notifications = data.notifications;
		if(data.notifications && data.notifications.length > 0)
			App_Notifications.has_notification = true;

	}, function(error) {
		console.log(error)
	});
}

function reloadInterviewEvents() {
	app.interview_events = []

	Vue.http.get('/holistics_recruitment/events?q=Interview&t='+(new Date()), {}).then(function(data) {
		console.log(data);

		for(var i=0; i<data.body.length; i++)
		{
			var item = data.body[i];

			

			if(item.start.dateTime)
			{
				item.start.date = moment(item.start.date).format('YYYY-MM-DD')
			}

			item.start.day = moment(item.start.date).format('dddd');

			app.interview_events.push(item)
		}

	}, function(error) {
		console.log(error)
	});
}

window.onload = function() {
	reloadInterviewEvents();
}
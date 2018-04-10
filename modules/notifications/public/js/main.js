var app = new Vue({
  el: '#app',
  data: {
    notifications: [{
    	message: "demo"
    }]
  },
  methods: {
		trigger: function() {
			Vue.http.get('/notifications/trigger_all', {}).then(function(data) {
		

				getNotifications();

			}, function(error) {
				console.log(error)
			});
		}
	}
})
function getNotifications() {
	Vue.http.get('/notifications/list', {}).then(function(data) {
		

		app.notifications = data.body.notifications;
		console.log(data.body.notifications);

	}, function(error) {
		console.log(error)
	});
}


window.onload = function() {
	getNotifications();
}
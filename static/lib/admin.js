define('admin/plugins/meetup', ['settings'], function(Settings) {
	'use strict';
	/* globals $, app, socket, require */

	var ACP = {};

	ACP.init = function() {
		Settings.load('meetup', $('.meetup-settings'));

		$('#save').on('click', function() {
			Settings.save('meetup', $('.meetup-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'meetup-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});
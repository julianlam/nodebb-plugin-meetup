"use strict";

var templates = require.main.require('templates.js'),
	async = require.main.require('async'),
	fs = require.main.require('fs'),
	path = require.main.require('path'),
	request = require.main.require('request'),
	controllers = require('./lib/controllers'),

	meta = module.parent.require('./meta'),

	plugin = {
		api: {
			base: 'https://api.meetup.com/2'
		},
		templates: {
			ids: ['meetup-details'],
			paths: {
				'meetup-details': 'static/templates/widgets/meetup/admin/details.tpl'
			},
			names: {
				'meetup-details': 'Meetup Event Details'
			},
			descriptions: {
				'meetup-details': 'Displays details for a single Meetup Event (name, place, etc.)'
			},
			html: {}
		},
		settings: undefined
	},
	app;

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;

	// Expose app to plugin
	app = params.app;

	// Retrieve API key from settings
	meta.settings.get('meetup', function(err, settings) {
		plugin.settings = settings;
	});

	router.get('/admin/plugins/meetup', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/meetup', controllers.renderAdminPage);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/meetup',
		icon: 'fa-users',
		name: 'Meetup'
	});

	callback(null, header);
};

plugin.defineWidgets = function(widgets, callback) {
	async.each(plugin.templates.ids, function(templateName, next) {
		fs.readFile(path.join(__dirname, plugin.templates.paths[templateName]), {
			encoding: 'utf-8'
		}, function(err, raw) {
			if (err) {
				return next(err);
			}

			plugin.templates.html[templateName] = raw;
			next();
		});
	}, function(err) {
		widgets = widgets.concat(plugin.templates.ids.map(function(templateId) {
			return {
				widget: templateId,
				name: plugin.templates.names[templateId],
				description: plugin.templates.descriptions[templateId],
				content: plugin.templates.html[templateId]
			}
		}));

		callback(null, widgets);
	});
};

plugin.renderDetailsWidget = function(widget, callback) {
	request.get(plugin.api.base + '/event/' + widget.data.meetupId, {
		json: true,
		qs: {
			text_format: 'plain',
			key: plugin.settings.key,
			fields: 'group_photo'
		}
	}, function(err, res, body) {
		app.render('widgets/meetup/details', {
			showGroupPhoto: widget.data.showGroupPhoto === 'on',
			'event': body,
			status: {
				past: body.status === 'past',
				upcoming: body.status === 'upcoming'
			}
		}, function(err, html) {
			callback(null, html);
		});
	});
};

module.exports = plugin;
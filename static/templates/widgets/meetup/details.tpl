<div class="row">
	<!-- IF showGroupPhoto -->
	<img class="img-responsive" src="{event.group.group_photo.photo_link}" />
	<!-- ENDIF showGroupPhoto -->
	<h3>
		<strong>{event.name}</strong>
	</h3>
	<p>
		<!-- IF status.upcoming -->
		<span class="label label-success" style="text-transform: uppercase">{event.status}</span>
		<!-- ENDIF status.upcoming -->
		<!-- IF status.past -->
		<span class="label label-danger" style="text-transform: uppercase">{event.status}</span>
		<!-- ENDIF status.past -->
	</p>
	<p>
		Hosted by <a target="_blank" href="http://meetup.com/{event.group.urlname}">{event.group.name}</a>
	</p>
	<p>
		{event.venue.name} &middot; {event.venue.address_1}<!--
		--><!-- IF event.venue.city -->, {event.venue.city}<!-- ENDIF event.venue.city --><!--
		--><!-- IF event.venue.state -->, {event.venue.state}<!-- ENDIF event.venue.state -->
	</p>
	<p>
		<a target="_blank" href="{event.event_url}">View on Meetup.com</a>
	</p>
</div>
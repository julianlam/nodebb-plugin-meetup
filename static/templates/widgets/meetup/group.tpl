<div class="row">
	<div class="col-xs-12">
		<!-- IF group -->
		<!-- IF showGroupPhoto -->
		<img class="img-responsive" src="{group.group_photo.photo_link}" />
		<!-- ENDIF showGroupPhoto -->
		<h3>
			<strong><a href="{group.link}">{group.name}</a></strong>
		</h3>
		<p>
			{group.members} {group.who}
		</p>
		{group.description}
		<!-- ELSE -->
		<div class="alert alert-info text-center">
			<i class="fa fa-exclamation-triangle"></i> No Group ID was provided for this widget!
		</div>
		<!-- ENDIF group -->
	</div>
</div>
define ([
	'dojo/request',
	'./js/widgets/ListManager.js',
	'./js/widgets/ProjectThumbnail.js'
], function(request, ListManager, ProjectThumbnail) {
	return {
		display: function(containerId, limit) {
			request('js/lists/projects.json', {
				handleAs: 'json'
			}).then(function(projects) {
				ListManager.displayList(projects, ProjectThumbnail, containerId, limit);
			});
		}
	}
});
dojoConfig = {
		async: true,
		parseOnLoad: true
};

var lists = [];
	
function displayProjects(count) {
	require([
		'./js/widgets/ListManager.js',
		'./js/widgets/ProjectThumbnail.js'
	], function(ListManager, ProjectThumbnail) {
		var parameters = {
				list: 'projects',
				containerId: 'portfolio',
				limit: count,
				widget: ProjectThumbnail
		};
		ListManager.displayList(parameters);
	});
}

function displayProject(index) {
	require([
		'dojo/request',
		'dojo/dom',
		'./js/widgets/ProjectThumbnail.js'
	], function(request, dom, ProjectThumbnail) {
		var uri = window.location.href;
		var query = uri.substring(uri.indexOf('?') + 1, uri.length);
		query = ioQuery.queryToObject(query);
		
		if (query.idx == null) {
			query.idx = 0;
		}
		
		request('js/lists/projects.json', {
			handleAs: 'json'
		}).then(function(list) {
			var container = dom.byId('test');
			var widget = new ProjectThumbnail(list[query.idx], query.idx);
			widget.placeAt(container);
		});
	});
}
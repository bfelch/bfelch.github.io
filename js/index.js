dojoConfig = {
		async: true,
		parseOnLoad: true
};

function includeHeader() {
	require([
		'dojo/query',
		'dojo/dom-construct',
		'dojo/_base/array',
		'./js/widgets/IncludesManager.js'
	], function(query, domConstruct, arrayUtil, IncludesManager) {
		var head = query('head')[0];
		var includes = new IncludesManager();
		console.log(head);
		console.log(includes);
		console.log(includes.domNode);
		head.innerHTML = includes.domNode.innerHTML + head.innerHTML;
//		arrayUtil.forEach(includes.domNode.children, function(node) {
//			console.log(node);
//			domConstruct.place(node, head);
//		});
	})
}
	
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
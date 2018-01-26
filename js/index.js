dojoConfig = {
		async: true,
		parseOnLoad: true
};

function includeHeader() {
	require([
		'dojo/query',
		'dojo/dom-construct',
		'dojo/text!./js/widgets/templates/Includes.html'
	], function(query, domConstruct, includes) {
		var head = query('head')[0];
		console.log(head);
		domConstruct.place(includes, head, 'first');
	});
}
	
function displayGames(count) {
	require([
		'./js/widgets/ListManager.js',
		'./js/widgets/GameThumbnail.js'
	], function(ListManager, GameThumbnail) {
		var parameters = {
				list: 'games',
				containerId: 'gameContainer',
				limit: count,
				widget: GameThumbnail
		};
		ListManager.displayList(parameters);
	});
}

function displayGame(index) {
	require([
		'dojo/request',
		'dojo/dom',
		'./js/widgets/GameThumbnail.js'
	], function(request, dom, GameThumbnail) {
		var uri = window.location.href;
		var query = uri.substring(uri.indexOf('?') + 1, uri.length);
		query = ioQuery.queryToObject(query);
		
		if (query.idx == null) {
			query.idx = 0;
		}
		s
		request('js/lists/games.json', {
			handleAs: 'json'
		}).then(function(list) {
			var container = dom.byId('test');
			var widget = new GameThumbnail(list[query.idx], query.idx);
			widget.placeAt(container);
		});
	});
}
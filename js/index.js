dojoConfig = {
		async: true,
		parseOnLoad: true
};

var showcaseWidgets = {
		game: 'GameThumbnail'
};

var lists = {
		game: 'games'
}

function includeHeader() {
	require([
		'dojo/query',
		'dojo/dom-construct',
		'dojo/text!./js/widgets/templates/Includes.html'
	], function(query, domConstruct, includes) {
		var head = query('head')[0];
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

function displayShowcase() {
	require([
		'dojo/io-query'
	], function(ioQuery) {
		var uri = window.location.href;
		var query = uri.substring(uri.indexOf('?') + 1, uri.length);
		query = ioQuery.queryToObject(query);
		
		var widgetString = './js/widgets/' + showcaseWidgets[query.type] + '.js';
		
		require([
			'dojo/request',
			'dojo/dom',
			widgetString
		], function(request, dom, Widget) {
			request('js/lists/' + lists[query.type] + '.json', {
				handleAs: 'json'
			}).then(function(list) {
				var container = dom.byId('test');
				var widget = new Widget(list[query.idx], query.idx);
				widget.placeAt(container);
			});
		});
	});
}
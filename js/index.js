dojoConfig = {
		async: true,
		parseOnLoad: true
};

var galleryWidgets = {
		game: 'GameThumbnail'
};

var showcaseWidgets = {
		game: 'GameThumbnail'
};

var lists = {
		game: 'games'
};

function includeCommon() {
	includeHeader();
	includeNavbar();
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

function includeNavbar() {
	require([
		'dojo/query',
		'dojo/dom-construct',
		'dojo/text!./js/widgets/templates/Navbar.html'
	], function(query, domConstruct, navbar) {
		var body = query('body')[0];
		domConstruct.place(navbar, body, 'first');
	});
}

function displayGallery() {
	require([
		'dojo/io-query',
		'dojo/dom',
		'dojo/dom-class'
		], function(ioQuery, dom, domClass) {
		var query = getQueryObject(ioQuery);
		
		var title = dom.byId('galleryTitle');
		title.innerHTML = lists[query.type].toUpperCase();
		domClass.add(title.parentNode, 'banner-' + lists[query.type]);
		
		displayGalleryItems(query.type, 0, 'galleryContainer');
	});
}
	
function displayGalleryItems(type, count, container) {
	var widgetPath = getGalleryWidgetPath(type);
	var listName = lists[type];

	require([
		'./js/widgets/ListManager.js',
		widgetPath
	], function(ListManager, Widget) {
		var parameters = {
				list: listName,
				containerId: container,
				limit: count,
				widget: Widget
		};
		ListManager.displayList(parameters);
	});
}

function displayShowcase() {
	require([
		'dojo/io-query'
	], function(ioQuery) {
		var query = getQueryObject(ioQuery);
		
		var widgetPath = getShowcaseWidgetPath(query.type);
		
		require([
			'dojo/request',
			'dojo/dom',
			'dojo/dom-class',
			widgetPath
		], function(request, dom, domClass, Widget) {
			request(getListPath(query.type), {
				handleAs: 'json'
			}).then(function(list) {
				var element = list[query.idx];
				
				var title = dom.byId('showcaseTitle');
				title.innerHTML = element.name.toUpperCase();
				if (element.bannerUrl != null) {
					// TODO add game specific banner if applicable
				} else {
					domClass.add(title.parentNode, 'banner-' + lists[query.type]);
				}
				
				var container = dom.byId('showcaseContainer');
				var widget = new Widget(element, query.idx);
				widget.placeAt(container);
			});
		});
	});
}

function getQueryObject(ioQuery) {
	var uri = window.location.href;
	var query = uri.substring(uri.indexOf('?') + 1, uri.length);
	query = ioQuery.queryToObject(query);
	
	return query;
}

function getGalleryWidgetPath(type) {
	return getWidgetPath(galleryWidgets[type]);
}

function getShowcaseWidgetPath(type) {
	return getWidgetPath(showcaseWidgets[type]);
}

function getWidgetPath(widget) {
	return './js/widgets/' + widget + '.js'
}

function getListPath(type) {
	return 'js/lists/' + lists[type] + '.json';
}
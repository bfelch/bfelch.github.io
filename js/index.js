'use strict';

String.prototype.capitalizeFirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

const dojoConfig = {
		async: true,
		parseOnLoad: true
};

const galleryWidgets = {
		games: 'GameThumbnail'
};

const showcaseWidgets = {
		games: 'GameShowcase'
};

const lists = {
		games: 'games'
};

function includeCommon() {
	includeHeader();
	includeNavbar();

	// $('.navbar').hide();
	
	// $(window).scroll(function() {
	// 	if ($(this).scrollTop() < 400) {
	// 		$('.navbar').fadeOut();
	// 	} else {
	// 		$('.navbar').fadeIn();
	// 	}
	// });
}

function includeHeader() {
	require([
		'dojo/query',
		'dojo/dom-construct',
		'dojo/text!./js/widgets/templates/Includes.html'
	], function(query, domConstruct, includes) {
		const head = query('head')[0];
		domConstruct.place(includes, head, 'first');
	});
}

function includeNavbar() {
	require([
		'dojo/query',
		'dojo/dom-construct',
		'dojo/text!./js/widgets/templates/Navbar.html'
	], function(query, domConstruct, navbar) {
		const bannerHead = query('.banner-head')[0];
		if (bannerHead) {
			domConstruct.place(navbar, bannerHead, 'after');
		} else {
			const body = query('body')[0];
			domConstruct.place(navbar, body, 'first');
		}

		const types = Object.keys(lists).map(key => lists[key]);
		types.forEach(type => domConstruct.create('a', {
			className: 'dropdown-item',
			href: './gallery.html?type=' + type,
			innerHTML: type.capitalizeFirst()
		}, 'dropdownProjectsContainer'));
	});
}

function displayGallery() {
	require([
		'dojo/io-query',
		'dojo/dom',
		'dojo/dom-class'
		], function(ioQuery, dom, domClass) {
		const query = getQueryObject(ioQuery);
		
		const title = dom.byId('galleryTitle');
		title.innerHTML = lists[query.type].toUpperCase();
		domClass.add(title.parentNode, 'banner-' + lists[query.type]);
		
		displayGalleryItems(query.type, 0, 'galleryContainer');
	});
}
	
function displayGalleryItems(type, count, container) {
	const widgetPath = getGalleryWidgetPath(type);
	const listName = lists[type];

	require([
		'./js/widgets/ListManager.js',
		widgetPath
	], function(ListManager, Widget) {
		const parameters = {
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
		const query = getQueryObject(ioQuery);
		
		const widgetPath = getShowcaseWidgetPath(query.type);
		
		require([
			'dojo/request',
			'dojo/dom',
			'dojo/dom-class',
			widgetPath
		], function(request, dom, domClass, Widget) {
			request(getListPath(query.type), {
				handleAs: 'json'
			}).then(function(list) {
				const element = list[query.idx];
				
				const title = dom.byId('showcaseTitle');
				title.innerHTML = element.name.toUpperCase();
				if (element.bannerUrl != null) {
					// TODO add game specific banner if applicable
				} else {
					domClass.add(title.parentNode, 'banner-' + lists[query.type]);
				}
				
				const container = dom.byId('showcaseContainer');
				const widget = new Widget(element);
				widget.placeAt(container);
			});
		});
	});
}

function getQueryObject(ioQuery) {
	const uri = window.location.href;
	let query = uri.substring(uri.indexOf('?') + 1, uri.length);
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
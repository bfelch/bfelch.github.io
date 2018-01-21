define ([
	'dojo/dom',
	'dojo/_base/array'
], function(dom, arrayUtil) {
	return {
		displayList: function(list, Widget, containerId, limit) {
			var container = dom.byId(containerId);
			arrayUtil.forEach(list, function(element, i) {
				if (i > 0 && i >= limit) { return; }
				var widget = new Widget(element).placeAt(container);
			});
		}
	}
});
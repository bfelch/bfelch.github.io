define ([
	'dojo/request',
	'dojo/dom',
	'dojo/_base/array'
], function(request, dom, arrayUtil) {
	return {
		displayList: function(parameters) {
			request('js/lists/' + parameters.list + '.json', {
				handleAs: 'json'
			}).then(function(list) {
				var container = dom.byId(parameters.containerId);
				arrayUtil.forEach(list, function(element, i) {
					if (parameters.limit > 0 && i >= parameters.limit) { return; }
					var widget = new parameters.widget(element);
					widget.placeAt(container);
				});
			});
		}
	}
});
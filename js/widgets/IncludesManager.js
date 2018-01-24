define ([
	'dojo/_base/declare',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojo/text!/js/widgets/templates/Includes.html'
], function(
		declare,
		_WidgetBase,
		_TemplatedMixin,
		template) {
	return declare('IncludesManager', [_WidgetBase, _TemplatedMixin], {
		templateString: template,
		
		postCreate: function() {
			this.inherited(arguments);
		}
	});
});
define ([
	'dojo/_base/declare',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojo/text!/js/widgets/templates/Navbar.html'
], function(
		declare,
		_WidgetBase,
		_TemplatedMixin,
		template) {
	return declare('Navbar', [_WidgetBase, _TemplatedMixin], {
		templateString: template,
		
		postCreate: function() {
			this.inherited(arguments);
		},
	});
});
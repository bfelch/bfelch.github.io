define ([
	'dojo/_base/declare',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojo/text!/js/widgets/templates/ProjectThumbnail.html'
], function(
		declare,
		_WidgetBase,
		_TemplatedMixin,
		template) {
	return declare('ProjectThumbnail', [_WidgetBase, _TemplatedMixin], {
		templateString: template,
		name: 'No Name',
		thumbnail: '',
		pitch: '',
		
		constructor: function(project) {
			this.name = project.name;
			this.thumbnail = project.img_s;
		},
		
		postCreate: function() {
			this.inherited(arguments);
		},
		
		_setNameAttr: function(name) {
			if (name != '') {
				this._set('name', name);
			}
		},
		
		_setThumbnailAttr: function(imagePath) {
			if (imagePath != '') {
				imagePath = './img/portfolio/' + imagePath;
				
				this._set('thumbnail', imagePath);
				this.thumbnailNode.src = imagePath;
			}
		},
		
		_setPitchAttr: function(pitch) {
			if (pitch != '') {
				this._set('pitch', pitch);
			}
		}
	});
});
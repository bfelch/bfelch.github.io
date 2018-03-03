define ([
	'dojo/_base/declare',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojo/text!/js/widgets/templates/GameThumbnail.html'
], function(
		declare,
		_WidgetBase,
		_TemplatedMixin,
		template) {
	return declare('GameThumbnail', [_WidgetBase, _TemplatedMixin], {
		templateString: template,
		name: 'No Name',
		thumbnail: '',
		pitch: '',
		index: 0,
		
		constructor: function(game, index) {
			this.name = game.name;
			this.thumbnail = game.img_s;
			this.pitch = game.pitch;
			this.index = index;
		},
		
		postCreate: function() {
			this.inherited(arguments);
		},
		
		_setNameAttr: function(name) {
			if (name !== '') {
				this._set('name', name);
			}
		},
		
		_setThumbnailAttr: function(imagePath) {
			if (imagePath !== '') {
				imagePath = './img/games/' + imagePath;
				
				this._set('thumbnail', imagePath);
				this.thumbnailNode.src = imagePath;
			}
		},
		
		_setPitchAttr: function(pitch) {
			if (pitch !== '') {
				this._set('pitch', pitch);
			}
		},
		
		_setIndexAttr: function(index) {
			this._set('index', index);
		}
	});
});
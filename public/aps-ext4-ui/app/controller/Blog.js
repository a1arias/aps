Ext.define('BlogEditor.controller.Blog', {
	extend: 'Ext.app.Controller',
	stores: ['Blog'],
	models: ['Blog'],
	views: [
		'blog.Edit'
	],

	init: function(){
		console.log('Blog controller loaded');
	}
})
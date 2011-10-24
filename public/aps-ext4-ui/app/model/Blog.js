// Blog model provider

Ext.define('BlogEditor.model.Blog', {
	extend: 'Ext.data.Model',
	fields: ['id', 'title', 'article'],
	proxy: {
		type: 'rest',
		url: '/blog',
		format: 'json',
		reader: {
			type: 'json',
			root: 'article',
			successProperty: 'success'
		}
	}
});
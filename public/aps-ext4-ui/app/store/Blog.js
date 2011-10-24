// Blog article store

Ext.define('BlogEditor.store.Blog', {
	extend: 'Ext.data.Store',
	model: 'BlogEditor.model.Blog',
	autoLoad: true
});
Ext.define('BlogEditor.view.blog.Edit', {
	extend: 'Ext.form.HtmlEditor',
	alias: 'widget.blogedit',

	title: 'Edit Blog',
	autoShow: true,

	initComponent: function(){
		this.items = [
			{
				xtype: 'htmleditor',
				name: 'article'
			}
		]
	}	
})
Ext.application({
    name: 'BlogEditor',

    appFolder: '/aps-ext4-ui/app',

    controllers: [
    	'Blog'
    ],

    launch: function() {
        Ext.create('Ext.panel.Panel', {
        	renderTo: 'editor',
            layout: 'fit',
            items: {
                xtype: 'blogedit',
                height: 600
            }
        });
    }
});
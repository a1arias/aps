Ext.application({
    name: 'AM',

    appFolder: 'aps-ext4-ui/app',

    controllers: [
    	'Users'
    ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'userlist'
            }
        });
    }
});
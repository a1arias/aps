Ext.define('Flicks.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'fit',

    items: [{
        xtype: 'panel',
        title: 'All Time Favorite Flicks',
        items: [{
            xtype: 'movieseditor'
        }]
    }]
});
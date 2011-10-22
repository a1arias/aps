Ext.define('GeekFlicks.store.Movies', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    fields: ['title', 'year'],

    // Data removed, instead using proxy:
    proxy: {
        type: 'ajax',
        url: 'http://local.host:3000/flicks.json',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
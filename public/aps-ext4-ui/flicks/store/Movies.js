Ext.define('GeekFlicks.store.Movies', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    fields: ['title', 'year'],

    // Data removed, instead using proxy:
    proxy: {
        type: 'ajax',
        url: 'flicks.json',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
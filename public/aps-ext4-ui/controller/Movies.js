Ext.define("Flicks.controller.Movies", {
    extend: 'Ext.app.Controller',

    models: ['Movie'],
    stores: ['Movies'],
    views:  ['Movies'],

    init: function () {
        this.control({
            'movieseditor': {
                render: this.onEditorRender
            }
        });
    },

    onEditorRender: function () {
        console.log("Movies editor was rendered");
    }
});
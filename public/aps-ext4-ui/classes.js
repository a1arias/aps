Ext.define("MyDesktop.Notepad", {
	extend: "Ext.ux.desktop.Module",
	requires: ["Ext.form.field.HtmlEditor"],
	id: "notepad",
	init: function() {
		this.launcher = {
			text: "Notepad",
			iconCls: "notepad",
			handler: this.createWindow,
			scope: this
		}
	},
	createWindow: function() {
		var b = this.app.getDesktop();
		var a = b.getWindow("notepad");
		if (!a) {
			a = b.createWindow({
				id: "notepad",
				title: "Notepad",
				width: 600,
				height: 400,
				iconCls: "notepad",
				animCollapse: false,
				border: false,
				hideMode: "offsets",
				layout: "fit",
				items: [{
					xtype: "htmleditor",
					id: "notepad-editor",
					value: ['Some <b>rich</b> <font color="red">text</font> goes <u>here</u><br>', "Give it a try!"].join("")
				}]
			})
		}
		a.show();
		return a
	}
});
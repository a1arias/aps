Ext.define('AM.model.User', {
	extend: 'Ext.data.Model',
	fields: ['id', 'name', 'email'],
	proxy: {
		type: 'rest',
		api: {
			create: '/users',
			read: '/users.json',
			update: '/users',
			destroy: '/users'
		},
		reader: {
			type: 'json',
			root: 'users',
			successProperty: 'success'
		}
	}
});
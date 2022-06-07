export default {
	// API_KEY: process.env['API_KEY'] || '2f92e185de0504e4751d83946ea2f01d',
	ACCESS_TOKEN_DURATION: '30m',
	// REFRESH_TOKEN_DURATION: '4H',

	DATABASE: {
		TYPE: process.env['DATABASE_TYPE'] || 'postgres',
		HOST: process.env['DATABASE_HOST'] || 'localhost',
		PORT: parseInt(process.env['DATABASE_PORT'] || '5432'),
		USERNAME: process.env['DATABASE_USERNAME'] || 'postgres',
		PASSWORD: process.env['DATABASE_PASSWORD'] || 'root',
		NAME: process.env['DATABASE_NAME'] || 'citycom_task'
	},
}

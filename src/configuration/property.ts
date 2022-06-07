export default {
	ACCESS_TOKEN_DURATION: '30m',
	JWT_SECRET: 'some_secret_key',
	
	DATABASE: {
		TYPE: process.env['DATABASE_TYPE'] || 'postgres',
		HOST: process.env['DATABASE_HOST'] || 'ec2-52-73-184-24.compute-1.amazonaws.com',
		PORT: parseInt(process.env['DATABASE_PORT'] || '5432'),
		USERNAME: process.env['DATABASE_USERNAME'] || 'ljygjbkzwxillx',
		PASSWORD: process.env['DATABASE_PASSWORD'] || 'cd62a01f30a844a34aad70664bfe0db97fc91b8b8900f72737c030371c8cd33e',
		NAME: process.env['DATABASE_NAME'] || 'd56qodf950mvpn'
	},
}

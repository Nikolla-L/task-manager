import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConnectionOptions} from 'typeorm';
import prop from './property';
// import {SnakeNamingStrategy} from 'typeorm-naming-strategies';

// @Global()
@Module({
	imports: [
		TypeOrmModule.forRoot(<ConnectionOptions>{
			type: prop.DATABASE.TYPE,
			host: prop.DATABASE.HOST,
			port: prop.DATABASE.PORT,
			username: prop.DATABASE.USERNAME,
			password: prop.DATABASE.PASSWORD,
			database: prop.DATABASE.NAME,
			entities: ['dist/**/entities/*{.js,.ts}'],
			synchronize: true,
			// namingStrategy: new SnakeNamingStrategy(),
			// autoLoadEntities: true,
			// logging: 'all'
		}),
	]
})
export class DBModule {
}
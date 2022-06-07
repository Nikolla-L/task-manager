import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from '@nestjs/common';

export const InitOpenApi = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('Citycom task api docs')
		.setDescription('Citycom task api documentation')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api-docs', app, document);
};
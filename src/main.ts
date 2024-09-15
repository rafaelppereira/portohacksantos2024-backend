import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    origin: '*',
  });
  app.enableVersioning();

  const config = new DocumentBuilder()
    .setTitle('Porto Hack Santos 2024')
    .setDescription(
      'Projeto criado com o objetivo de trazer uma solução de análise de dados entre alterações de previsão.',
    )
    .setVersion('1.0.0')
    .setContact(
      'Equipe Nitro HUB',
      'https://nitrohub.com',
      'equipe@nitrhub.com',
    )
    .addApiKey({
      name: 'ApiKey',
      type: 'apiKey',
      bearerFormat: 'ApiKey',
      'x-tokenName': 'ApiKey',
    })
    .setBasePath('api')
    .addTag(
      'RealClinic Integration',
      'Endpoints related to integration with RealClinic',
    )
    .addTag(
      'Botconversa Integration',
      'Endpoints related to integration with Botconversa',
    )
    .addTag('Organization Application', 'Endpoints related to organization')
    .addTag('Session Application', 'Endpoints related to session')
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .setExternalDoc('Documentação adicional', 'https://conectaclinica.com/docs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () =>
    Logger.verbose(`Server listening on port ${port}`),
  );
}
bootstrap();

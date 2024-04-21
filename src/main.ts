import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
      .setTitle('Church project')
      .setDescription('Church')
      .setVersion('1.0')
      .addTag('church')
      .addServer('http://localhost:8000/', 'Local environment')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ exposedHeaders: ['Content-Disposition'] });
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();

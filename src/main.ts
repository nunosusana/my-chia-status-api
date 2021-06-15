import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as https from 'https';
import * as express from 'express';


async function bootstrap() {
  
  const privateKey = fs.readFileSync(process.env.PRIVATE_KEY);
  const certificate = fs.readFileSync(process.env.CERTIFICATE);
  const httpsOptions = {key: privateKey, cert: certificate};
  const server = express();
  process.env.KEY = null;

  const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );
    
    app.enableCors();
    const options = new DocumentBuilder()
      .setTitle('CHIA STATUS API')
      .setDescription('This API controls your Chia Harvester/Farmer/Plotter/Wallet, not exposing any secret detail of your wallet.')
      .setVersion(process.env.VERSION)
      .addBearerAuth({ type: 'http', scheme: 'bearer'})
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

  await app.init();

  https.createServer(httpsOptions, server).listen(process.env.API_PORT_SECURE);
}
bootstrap();

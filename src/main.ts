import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sshTunnel } from "./util/tunnel";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        allowedHeaders: [
            'Pragma',
            'Cache-Control',
            'Content-Type',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Headers',
            'Authorization',
            'X-Requested-With',
        ],
        exposedHeaders: [],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        origin: ['http://localhost:5173','*'],
        maxAge: 600,
        optionsSuccessStatus: 204,
        credentials: true,
        preflightContinue: false,
    });
    await sshTunnel();
    console.log('server start with 3000')
    await app.listen(3000);
}

bootstrap();

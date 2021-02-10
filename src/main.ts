import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import * as config from 'config'

import { AppModule } from './app.module'

const SERVER = config.get('server')

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  app.enableCors()

  await app.listen(SERVER.port, SERVER.ip)
}

bootstrap()

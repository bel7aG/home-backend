import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import * as config from 'config'

import { ContractModule } from './modules/contract/contract.module'
import { PaymentModule } from './modules/payment/payment.module'

const MONGO = config.get('mongoDB')

@Module({
  imports: [
    MongooseModule.forRoot(MONGO.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      dbName: process.env.DATABASE_NAME
    }),

    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      playground: {
        settings: {
          ['request.credentials']: 'same-origin'
        }
      },
      autoSchemaFile: 'schemas.gql',
      context: ({ req }) => ({ req }),
      path: '/'
    }),

    ContractModule,
    PaymentModule
  ]
})
export class AppModule {}

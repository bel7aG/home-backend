import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PaymentService } from './payment.service'
import { PaymentResolver } from './payment.resolver'
import { PaymentSchema } from './schemas/payment.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Payment',
        schema: PaymentSchema,
        collection: 'payments'
      }
    ])
  ],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentResolver, PaymentService]
})
export class PaymentModule {}

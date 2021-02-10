import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PaymentService } from './payment.service'
import { PaymentResolver } from './payment.resolver'
import { PaymentSchema } from './schemas/payment.schema'
import { ContractModule } from './../contract/contract.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Payment',
        schema: PaymentSchema,
        collection: 'payments'
      }
    ]),
    forwardRef(() => ContractModule)
  ],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentResolver, PaymentService]
})
export class PaymentModule {}

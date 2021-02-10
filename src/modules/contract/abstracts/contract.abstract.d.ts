import { Field, ID, InterfaceType } from '@nestjs/graphql'

import { PaymentType } from './../../payment/type/payment.type'
import { IPayment } from '../../payment/interfaces/payment.interface'

@InterfaceType()
export abstract class AbstractContract {
  @Field(() => ID)
  readonly id: string | typeof ID

  @Field(() => [PaymentType])
  payments: IPayment[]
}

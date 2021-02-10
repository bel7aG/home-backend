import { ObjectType, Field, ID } from '@nestjs/graphql'

import { IPayment } from '../../payment/interfaces/payment.interface'
import { PaymentType } from './../../payment/type/payment.type'

@ObjectType()
export class ContractType {
  @Field(() => ID)
  readonly id: string | typeof ID

  @Field(() => Number)
  readonly sum: number

  @Field(() => [PaymentType])
  payments: IPayment[]
}

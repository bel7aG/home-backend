import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { PaymentService } from './payment.service'
import { PaymentType } from './type/payment.type'
import { PaymentCreateInput } from './input/payment.input'

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => String)
  async payments() {
    return this.paymentService.findAll()
  }

  @Mutation(() => PaymentType)
  async createPayment(@Args('input') input: PaymentCreateInput) {
    return this.paymentService.create(input)
  }
}

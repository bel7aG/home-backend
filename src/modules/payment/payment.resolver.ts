import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { PaymentService } from './payment.service'
import { PaymentType } from './type/payment.type'
import { PaymentCreateInput, PaymentUpdateInput } from './input/payment.input'

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

  @Mutation(() => PaymentType)
  async updatePayment(@Args('id') id: string, @Args('input') input: PaymentUpdateInput) {
    return this.paymentService.update(id, input)
  }

  @Mutation(() => PaymentType)
  async deletePayment(@Args('id') id: string) {
    return this.paymentService.delete(id)
  }
}

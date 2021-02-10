import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { ContractService } from './contract.service'
import { ContractType } from './type/contract.type'

@Resolver()
export class ContractResolver {
  constructor(private readonly contractService: ContractService) {}

  @Query(() => [ContractType], { nullable: true })
  async contracts() {
    return this.contractService.find()
  }

  @Query(() => ContractType, { nullable: true })
  async contract(@Args('id') id: string) {
    return this.contractService.find(id)
  }

  @Mutation(() => ContractType)
  async createContract() {
    return this.contractService.create()
  }
}

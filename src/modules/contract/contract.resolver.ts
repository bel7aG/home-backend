import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { ContractService } from './contract.service'
import { ContractType } from './type/contract.type'
import { ContractFetchInput } from './input/contract.input'

@Resolver()
export class ContractResolver {
  constructor(private readonly contractService: ContractService) {}

  @Query(() => ContractType, { nullable: true })
  async contract(@Args('input') input: ContractFetchInput) {
    return this.contractService.find(input)
  }

  @Mutation(() => ContractType)
  async createContract() {
    return this.contractService.create()
  }
}

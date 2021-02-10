import { Resolver, Query, Mutation } from '@nestjs/graphql'

import { ContractService } from './contract.service'
import { ContractType } from './type/contract.type'

@Resolver()
export class ContractResolver {
  constructor(private readonly contractService: ContractService) {}

  @Query(() => String)
  async contracts() {
    return this.contractService.findAll()
  }

  @Mutation(() => ContractType)
  async createContract() {
    return this.contractService.create()
  }
}

import { Resolver, Query } from '@nestjs/graphql'

import { ContractService } from './contract.service'

@Resolver()
export class ContractResolver {
  constructor(private readonly contractService: ContractService) {}

  @Query(() => String)
  async contracts() {
    return this.contractService.findAll()
  }
}

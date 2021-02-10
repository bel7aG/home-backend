import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ContractService } from './contract.service'
import { ContractResolver } from './contract.resolver'
import { ContractSchema } from './schemas/contract.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Contract',
        schema: ContractSchema,
        collection: 'contracts'
      }
    ])
  ],
  providers: [ContractService, ContractResolver],
  exports: [ContractResolver, ContractService]
})
export class ContractModule {}

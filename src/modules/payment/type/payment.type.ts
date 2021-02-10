import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ContractType } from '../../contract/type/contract.type'
import { IContract } from '../../contract/interfaces/contract.interface'

@ObjectType()
export class PaymentType {
  @Field(() => ID)
  readonly id: string | typeof ID

  @Field(() => String)
  contractId: IContract

  @Field(() => String)
  description: string

  @Field(() => Number)
  value: number

  @Field(() => String)
  time: string

  @Field(() => Boolean)
  isImported: boolean

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string

  @Field(() => Boolean)
  isDeleted: boolean
}

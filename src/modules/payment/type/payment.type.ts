import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IContract } from '../../contract/interfaces/contract.interface'

@ObjectType()
export class PaymentType {
  @Field(() => ID)
  readonly id: string | typeof ID

  @Field(() => ID)
  contractId: IContract

  @Field(() => String)
  description: string

  @Field(() => Number)
  value: number

  @Field(() => String)
  time: object

  @Field(() => Boolean)
  isImported: boolean

  @Field(() => ID)
  createdAt: Date

  @Field(() => String)
  updatedAt: object

  @Field(() => Boolean)
  isDeleted: boolean
}

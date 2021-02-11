import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class ContractFetchInput {
  @Field(() => String)
  contractId: string

  @Field(() => String, { nullable: true })
  startDate?: string

  @Field(() => String, { nullable: true })
  endDate?: string
}

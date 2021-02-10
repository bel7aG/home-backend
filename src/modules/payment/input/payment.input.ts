/* tslint:disable:max-classes-per-file */
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class PaymentCreateInput {
  @Field(() => String)
  contractId: string

  @Field(() => String)
  description?: string

  @Field(() => Number)
  value?: number

  @Field(() => String, { nullable: true })
  time?: string

  @Field(() => Boolean, { nullable: true })
  isImported?: boolean

  @Field(() => Boolean, { nullable: true })
  isDeleted?: boolean
}

@InputType()
export class PaymentUpdateInput {
  @Field(() => String)
  description?: string

  @Field(() => Number)
  value?: number

  @Field(() => String, { nullable: true })
  time?: string

  @Field(() => Boolean, { nullable: true })
  isImported?: boolean
}

@InputType()
export class PaymentFetchInput {
  @Field(() => String)
  contractId: string

  @Field(() => String, { nullable: true })
  startDate?: string

  @Field(() => String, { nullable: true })
  endDate?: string
}

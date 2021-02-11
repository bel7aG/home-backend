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
  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Number, { nullable: true })
  value?: number

  @Field(() => String, { nullable: true })
  time?: string

  @Field(() => Boolean, { nullable: true })
  isImported?: boolean
}

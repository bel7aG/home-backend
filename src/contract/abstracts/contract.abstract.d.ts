import { Field, ID, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class AbstractContract {
  @Field(() => ID)
  readonly id: string | typeof ID
}

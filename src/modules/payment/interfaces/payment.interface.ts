import { ID } from '@nestjs/graphql'
import { Document } from 'mongoose'
import { IContract } from '../../contract/interfaces/contract.interface'

export interface PaymentDoc extends Document {
  readonly id: string | typeof ID

  contractId: IContract

  description: string

  value: number

  time: object

  isImported: boolean

  createdAt: Date

  updatedAt: object

  isDeleted: boolean
}

export interface IPayment {
  readonly id?: string | typeof ID

  contractId?: IContract

  description?: string

  value?: number

  time?: object

  isImported?: boolean

  createdAt?: Date

  updatedAt?: object

  isDeleted?: boolean
}

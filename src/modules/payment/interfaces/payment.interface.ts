import { ID } from '@nestjs/graphql'
import { Document } from 'mongoose'

export interface PaymentDoc extends Document {
  readonly id: string | typeof ID

  contractId: string

  description: string

  value: number

  time: string

  isImported: boolean

  createdAt: string

  updatedAt: string

  isDeleted: boolean
}

export interface IPayment {
  readonly id?: string | typeof ID

  contractId?: string

  description?: string

  value?: number

  time?: string

  isImported?: boolean

  createdAt?: string

  updatedAt?: string

  isDeleted?: boolean
}

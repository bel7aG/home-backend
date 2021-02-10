import { Document } from 'mongoose'
import { IPayment } from '../../payment/interfaces/payment.interface'

export interface ContractDoc extends Document {
  id: string
  sum: number
  payments: IPayment[]
}

export interface IContract {
  id: string
  sum: number
  payments: IPayment[]
}

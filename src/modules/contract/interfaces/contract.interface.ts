import { Document } from 'mongoose'
import { IPayment } from '../../payment/interfaces/payment.interface'

export interface ContractDoc extends Document {
  id: string
  payments: IPayment[]
}

export interface IContract {
  id: string
  payments: IPayment[]
}

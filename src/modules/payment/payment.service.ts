import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { PaymentDoc } from './interfaces/payment.interface'

@Injectable()
export class PaymentService {
  constructor(@InjectModel('Payment') private paymentModel: Model<PaymentDoc>) {}

  async findAll(): Promise<string> {
    return 'Hello'
  }
}

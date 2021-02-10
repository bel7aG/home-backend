import { forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ContractType } from './type/contract.type'
import { ContractDoc } from './interfaces/contract.interface'
import { PaymentService } from './../payment/payment.service'

@Injectable()
export class ContractService {
  constructor(
    @InjectModel('Contract') public contractModel: Model<ContractDoc>,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService
  ) {}

  async find(id?: string): Promise<ContractType | ContractType[]> {
    try {
      if (id) {
        const contract = await this.contractModel.findById(id).populate('payments')

        return contract
      } else {
        const contracts = await this.contractModel.find().populate('payments')

        return contracts
      }
    } catch {
      throw new RequestTimeoutException(`Something went wrong`)
    }
  }

  async create(): Promise<ContractType> {
    try {
      const contract = new this.contractModel()
      return await contract.save()
    } catch {
      throw new RequestTimeoutException(`Something went wrong`)
    }
  }
}

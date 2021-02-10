import { forwardRef, Inject, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { PaymentDoc } from './interfaces/payment.interface'
import { PaymentType } from './type/payment.type'
import { PaymentCreateInput } from './input/payment.input'
import { ContractService } from './../contract/contract.service'

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel('Payment') private paymentModel: Model<PaymentDoc>,
    @Inject(forwardRef(() => ContractService)) private readonly contractService: ContractService
  ) {}

  async findAll(): Promise<string> {
    return 'Hello'
  }

  async create(input: PaymentCreateInput): Promise<PaymentType> {
    const contract: any = await this.contractService.find(input.contractId)

    if (contract) {
      try {
        input.time = `${new Date()}`

        const payment = new this.paymentModel({
          ...input,
          time: `${new Date()}`,
          createdAt: `${new Date()}`,
          updatedAt: `${new Date()}`
        })

        await payment.save()

        await this.contractService.contractModel.findByIdAndUpdate(
          input.contractId,
          {
            sum: contract.sum += payment.value,
            $push: { payments: payment }
          },
          { new: true }
        )

        return payment
      } catch {
        throw new RequestTimeoutException(`Something went wrong.`)
      }
    } else {
      throw new NotFoundException(`Contract not found.`)
    }
  }
}

import { forwardRef, Inject, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { format } from 'date-fns'

import { PaymentDoc } from './interfaces/payment.interface'
import { PaymentType } from './type/payment.type'
import { PaymentCreateInput, PaymentUpdateInput } from './input/payment.input'
import { ContractService } from './../contract/contract.service'
import { IContract } from '../contract/interfaces/contract.interface'

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel('Payment') public paymentModel: Model<PaymentDoc>,
    @Inject(forwardRef(() => ContractService)) private readonly contractService: ContractService
  ) {}

  async findAll(): Promise<string> {
    return 'Hello'
  }

  async create(input: PaymentCreateInput): Promise<PaymentType> {
    const contract: any = await this.contractService.find(input.contractId)

    if (contract) {
      try {
        const payment = new this.paymentModel({
          ...input
        })

        await payment.save()

        await this.contractService.contractModel.findByIdAndUpdate(input.contractId, {
          sum: contract.sum += payment.value,
          $push: { items: payment }
        })

        return payment
      } catch {
        throw new RequestTimeoutException(`Something went wrong.`)
      }
    } else {
      throw new NotFoundException(`Contract not found.`)
    }
  }

  async findOne(id: string) {
    const payment: any = await this.paymentModel.findById(id)

    if (payment) return payment
    else throw new NotFoundException(`Payment not found.`)
  }

  async update(id: string, input: PaymentUpdateInput): Promise<PaymentType> {
    const payment = await this.findOne(id)
    if (input.time) input.time = format(new Date(input.time), `PPpp`)

    const chosenPayment = await this.paymentModel
      .findByIdAndUpdate(
        id,
        {
          ...input
        },
        {
          new: true
        }
      )
      .populate('contractId')

    if (input.value !== payment.value) {
      await this.contractService.contractModel.findByIdAndUpdate(
        (chosenPayment.contractId as IContract).id,
        {},
        (_, doc) => {
          doc.sum -= payment.value
          doc.sum += input.value

          doc.save()
        }
      )
    }

    return chosenPayment
  }

  async delete(id: string): Promise<PaymentType> {
    const chosenPayment = await this.paymentModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true
      },
      {
        new: true
      }
    )

    return chosenPayment
  }
}

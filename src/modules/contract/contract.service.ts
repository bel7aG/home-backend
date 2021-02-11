import { forwardRef, Inject, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Model } from 'mongoose'

import { ContractType } from './type/contract.type'
import { ContractDoc, IContract } from './interfaces/contract.interface'
import { PaymentService } from './../payment/payment.service'
import { ContractFetchInput } from './input/contract.input'
import { startOfDay, endOfDay, format } from 'date-fns'
import { IPayment } from '../payment/interfaces/payment.interface'

@Injectable()
export class ContractService {
  constructor(
    @InjectModel('Contract') public contractModel: Model<ContractDoc>,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService
  ) {}

  async find(input?: ContractFetchInput | string): Promise<ContractType | ContractType[]> {
    try {
      const isObject = typeof input === 'object'

      const byTime = {
        time: {
          $gte: startOfDay(new Date((input as ContractFetchInput).startDate)),
          $lt: endOfDay(new Date((input as ContractFetchInput).endDate))
        }
      }

      let condition = {
        contractId:
          typeof input === 'object'
            ? (mongoose.Types.ObjectId((input as ContractFetchInput).contractId) as any)
            : (input as string)
      }

      if (isObject && (input as ContractFetchInput).startDate && (input as ContractFetchInput).endDate) {
        condition = {
          ...condition,
          ...byTime
        }
      }

      const payments = await this.paymentService.paymentModel
        .find(condition)
        .lean()
        .exec()

      const contract = await this.contractModel
        .findById(isObject ? (input as ContractFetchInput).contractId : (input as string))
        .lean()

      contract.payments = payments.map(payment => ({
        ...payment,
        id: payment._id,
        ...this.converTime(payment)
      }))

      return { id: contract._id, ...contract } as any
    } catch {
      throw new NotFoundException(`Contract not found.`)
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

  converTime(payment: IPayment) {
    return {
      time: format(new Date(payment.time), `PPpp`),
      createdAt: format(new Date(payment.createdAt), `PPpp`),
      updatedAt: format(new Date(payment.updatedAt), `PPpp`)
    }
  }
}

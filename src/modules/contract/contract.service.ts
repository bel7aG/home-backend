import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ContractType } from './type/contract.type'
import { ContractDoc, IContract } from './interfaces/contract.interface'

@Injectable()
export class ContractService {
  constructor(@InjectModel('Contract') private contractModel: Model<ContractDoc>) {}

  async findAll(): Promise<string> {
    return 'Hello'
  }

  async create(): Promise<ContractType> {
    try {
      const contract = new this.contractModel()
      return await contract.save()
    } catch {
      throw new BadRequestException(`Something went wrong`)
    }
  }
}

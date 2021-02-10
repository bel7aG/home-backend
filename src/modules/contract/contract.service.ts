import { Injectable, RequestTimeoutException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ContractType } from './type/contract.type'
import { ContractDoc, IContract } from './interfaces/contract.interface'

@Injectable()
export class ContractService {
  constructor(@InjectModel('Contract') private contractModel: Model<ContractDoc>) {}

  async find(id?: string): Promise<ContractType | ContractType[]> {
    try {
      if (id) {
        return await this.contractModel.findById(id)
      } else {
        return await this.contractModel.find()
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

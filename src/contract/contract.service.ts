import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ContractDoc } from './interfaces/contract.interface'

@Injectable()
export class ContractService {
  constructor(@InjectModel('Contract') private contractModel: Model<ContractDoc>) {}

  async findAll(): Promise<String> {
    return 'Hello'
  }
}

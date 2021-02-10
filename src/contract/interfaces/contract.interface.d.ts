import { Document } from 'mongoose'

export interface ContractDoc extends Document {
  id: string
}

export interface Contract {
  id: string
}

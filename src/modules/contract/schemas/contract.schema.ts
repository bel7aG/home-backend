import * as mongoose from 'mongoose'

export const ContractSchema = new mongoose.Schema({
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }]
})

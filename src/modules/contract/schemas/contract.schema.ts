import * as mongoose from 'mongoose'

export const ContractSchema = new mongoose.Schema({
  sum: { type: Number, default: 0 },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }]
})

import * as mongoose from 'mongoose'

export const PaymentSchema = new mongoose.Schema({
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract' },

  description: String,

  value: Number,

  time: Date,

  isImported: { type: Boolean, default: false },

  createdAt: Date,

  updatedAt: Date,

  isDeleted: { type: Boolean, default: false }
})

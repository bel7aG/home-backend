import * as mongoose from 'mongoose'

export const PaymentSchema = new mongoose.Schema(
  {
    contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract' },

    description: String,

    value: Number,

    isImported: { type: Boolean, default: false },

    time: { type: Date, default: Date.now },

    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
)

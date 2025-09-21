const mongoose = require("mongoose");

const SchoolFeesApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicationType: {
    type: String,
    default: "schoolFees",
  },
  birthCertificate: {
    type: String,
    required: true,
  },
  leavingCertificate: {
    type: String,
    required: true,
  },
  marksheet: {
    type: String,
    required: true,
  },
  admissionProof: {
    type: String,
    required: true,
  },
  incomeProof: {
    type: String,
    required: true,
  },
  bankAccount: {
    type: String,
    required: true,
  },
  rationCard: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  rejectionReason: {
    type: String,
  },
  rejectionDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "SchoolFeesApplication",
  SchoolFeesApplicationSchema
);

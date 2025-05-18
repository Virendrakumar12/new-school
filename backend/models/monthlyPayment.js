const mongoose = require('mongoose');

const monthPaymentSchema = new mongoose.Schema({
    studentId: { // renamed from userId for clarity
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        enum: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        required: true
    },
    
    feeType: {
        type: String,
        enum: ['tuition', 'bus', 'combined'],
        default: 'combined'
    },

    breakdown: {
        tuition: {
            type: Number,
            default: 0
        },
        bus: {
            type: Number,
            default: 0
        }
    },

    amount: {
        type: Number,
        required: true
    },
     session: {
  type: String,
  default: function () {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${currentYear + 1}`;
  }
},

    status: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid'
    },

    razorpayPaymentId: { type: String, default: null },
    razorpayOrderId: { type: String, default: null },
    razorpaySignature: { type: String, default: null },
    paidAt: { type: Date, default: null }

}, { timestamps: true });

module.exports = mongoose.model('MonthPayment', monthPaymentSchema);

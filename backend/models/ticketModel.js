const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['laptop', 'mobile', 'tablet', 'smartwatch']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description of the issue']
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'close'],
        default: 'new'
    }
  }, 
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Ticket', ticketSchema)
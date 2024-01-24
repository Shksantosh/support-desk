const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @Description  Get user tickets
// @route GET /api/tickets
// @acess Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

// @Description  Get user ticket
// @route GET /api/tickets/:id
// @acess Private
const getTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
      const user = await User.findById(req.user.id)
  
      if(!user) {
          res.status(401)
          throw new Error('User not found')
      }
  
      const ticket = await Ticket.findById(req.params.id)
      
      if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

      res.status(200).json(ticket)
  })

// @Description  Create new ticket
// @route POST /api/tickets
// @acess Private
const createTicket = asyncHandler(async (req, res) => {
    const {product, description} = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

// @Description  Delete ticket
// @route DELETE /api/tickets/:id
// @acess Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
      const user = await User.findById(req.user.id)
  
      if(!user) {
          res.status(401)
          throw new Error('User not found')
      }
  
      const ticket = await Ticket.findById(req.params.id)
      
      if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    await Ticket.findByIdAndDelete(req.params.id)

      res.status(200).json({success: true})
  })

// @Description  Update ticket
// @route PUT /api/tickets/:id
// @acess Private
const updateTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
      const user = await User.findById(req.user.id)
  
      if(!user) {
          res.status(401)
          throw new Error('User not found')
      }
  
      const ticket = await Ticket.findById(req.params.id)
      
      if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updateTicket = await Ticket.findByIdAndUpdate(req.params.id,
        req.body, { new: true })

      res.status(200).json(updateTicket)
  })

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket,

}
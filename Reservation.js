const mongoose = require('./mongoose')
const reservation = new mongoose.Schema({
    User:String,
    Date:String,
    Identification:String,
    Phone:String,
    Expert:String
})
const Reservation =  mongoose.model('Reservation',reservation)
module.exports = {Reservation}
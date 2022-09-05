const mongoose = require("mongoose");

const Ticket = mongoose.Schema({
	TicketNumber:String,
	TurnID:String,
    Bets:Array,
    Statut:String,
	date:Date,
    payment:Number,
    IdentifiantStore:String
});

mongoose.model("Ticket", Ticket);
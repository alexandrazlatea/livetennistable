'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var TournamentSchema = new Schema({
    name: {
        type: String,
        Required: 'Kindly enter the name of the tournament'
    },
    country: {
        type: String,
        Required: 'Kindly enter the name of the tournament'
    },
    city: {
        type: String,
        Required: 'Kindly enter the name of the tournament'
    },
    address: {
        type: String,
    },
    minimumNumberPeople: {
        type: Number,
    },
    maximumNumberPeople: {
        type: Number,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    ticketPrice: {
        type: Number
    },
    createdBy: {
      type:  ObjectId,
    },
    isClosed: {
        type: 'boolean',
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    level: {
        type: Number
    },
    userIsJoined:{
        type: 'boolean',
        default: false,
    },
    peopleJoined:{
        type: Number,
        default: 0,
    },


});


module.exports = mongoose.model('Tournaments', TournamentSchema);
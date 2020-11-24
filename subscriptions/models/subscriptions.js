const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subscriptions = new Schema({
    id             : {type: Number, required: false},
    event_id       : {type: Number, required: true},
    user_id        : {type: Number, required: true},
    subscribed_at  : {type: Date, required: false},
    unsubscribed_at: {type: Date, required: false},
    checkin_at     : {type: Date, required: false},
}, {
    versionKey: false,
});

module.exports = mongoose.model('Subscriptions', Subscriptions)
const axios = require('axios');
const Subscriptions = require('../models/subscriptions');

formatDate = function (date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
}

exports.list = function (req, res) {
    if (req.query.user_id) {
        Subscriptions.find({user_id: req.query.user_id, unsubscribed_at: null}).exec((err, subscriptions) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            const eventsIds = JSON.stringify(subscriptions.map(subscription => subscription.event_id));
            axios.get(`http://172.10.10.30/public/api/events/fetch?ids=${eventsIds}`).then(response => {
                const events = response.data.events;
                const subs = subscriptions.map(subscription => {
                    const event = events.find(event => event.id === subscription.event_id);
                    event.subscribed_at = formatDate(new Date(subscription.subscribed_at));
                    event.checkin_at = subscription.checkin_at ? formatDate(new Date(subscription.checkin_at)) : null;
                    return event;
                })
                return res.status(200).json({subscriptions: subs});
            }, error => {
                return res.status(500).json({error: error});
            });
        });
    }
    if (req.query.event_id) {
        Subscriptions.find({event_id: req.query.event_id, unsubscribed_at: null}).exec((err, subscriptions) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            const usersIds = JSON.stringify(subscriptions.map(subscription => subscription.user_id));
            axios.get(`http://172.10.10.20/public/fetch?ids=${usersIds}`).then(response => {
                const users = response.data.users;
                const subs = subscriptions.map(subscription => {
                    const user = users.find(user => user.id === subscription.user_id);
                    user.subscribed_at = formatDate(new Date(subscription.subscribed_at));
                    user.checkin_at = subscription.checkin_at ? formatDate(new Date(subscription.checkin_at)) : null;
                    return user;
                })
                return res.status(200).json({users: subs});
            }, error => {
                return res.status(500).json({error: error});
            });
        });
    }
};

exports.create = function (req, res) {
    Subscriptions.find({...req.body, unsubscribed_at: null}).exec((err, subscriptions) => {

        // Check for error
        if (err) {
            return res.status(500).json({error: err});
        }

        // Check if the subscription already exists
        if (subscriptions.length > 0) {
            return res.status(400).json({error: "This subscription already exists!"});
        }

        // Create the new subscription
        let subscription = new Subscriptions(req.body);
        subscription.subscribed_at = new Date();

        // Check for event and user
        axios.all([
            axios.get(`http://172.10.10.30/public/api/events/${subscription.event_id}/exists`),
            axios.get(`http://172.10.10.20/public/${subscription.user_id}/exists`)
        ]).then(axios.spread((response1, response2) => {

            // Check if the event exists
            if (!response1.data.exists) {
                return res.status(400).json({error: "This event does not exists!"});
            }

            // Check if the user exists
            if (!response2.data.exists) {
                return res.status(400).json({error: "This user does not exists!"});
            }

            //  Store the subscription
            subscription.save((err) => {
                if (err) {
                    res.status(400).json({error: err});
                } else {
                    res.status(200).json({success: true});
                }
            });

        })).catch(error => {
            return res.status(500).json({error: error});
        });
    });
};

exports.delete = function (req, res) {
    Subscriptions.findOneAndUpdate(req.body, {$set: {unsubscribed_at: new Date()}}).exec((err, subscriptions) => {
        res.status(200).json({success: true});
    });
};

const express = require('express');
const router = express.Router();
const subscriptions = require('../controllers/subscriptions');

router.get('/list', function (req, res) {
    subscriptions.list(req, res);
});

router.post('/create', function (req, res) {
    subscriptions.create(req, res);
});

router.post('/delete', function (req, res) {
    subscriptions.delete(req, res);
});

module.exports = router;

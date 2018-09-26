const router = require('express').Router();

const webhook = require('../webhook');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected to susi chat server.' });
});

router.post('/webhook', webhook);

module.exports = router;

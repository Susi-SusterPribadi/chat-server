const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected to susi chat server.' });
});

router.post('/webhooks/prescriptions/create', (req, res, next) => {});

router.post('/webhooks/schedules/', (req, res, next) => {});

module.exports = router;

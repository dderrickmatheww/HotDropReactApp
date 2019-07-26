const router = require("express").Router();
const nameIDRoutes = require('./nameID');
const infoRoutes = require('./info');

// API routes
router.use('/nameID', nameIDRoutes);
router.use('/info', infoRoutes);

module.exports = router;

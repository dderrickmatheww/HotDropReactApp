const router = require("express").Router();
const nameIDRoutes = require('./nameID');
const infoRoutes = require('./info');
const giantbombRoutes = require('./giantbomb');
const userRoutes = require('./user');

// API routes
router.use('/nameID', nameIDRoutes);
router.use('/info', infoRoutes);
router.use('/giantbomb', giantbombRoutes);
router.use('/user', userRoutes);
module.exports = router;

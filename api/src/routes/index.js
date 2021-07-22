const { Router } = require('express');
const router = Router();
const cors = require('cors');
const CountriesRoutes = require('./countries');
const ActivitiesRoutes = require('./activities');

router.use(cors());
router.use('/countries', CountriesRoutes);
router.use('/activity', ActivitiesRoutes);


module.exports = router;

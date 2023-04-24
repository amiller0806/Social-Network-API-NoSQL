const router = require('express').Router();
const apiRoutes = require('./api');


// Here we integrate API routes into the server, importing all the routes to prefix their endpoint names and package them up 

router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.send('Wrong route!');
});

module.exports = router;

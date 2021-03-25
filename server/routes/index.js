const express = require('express');
const router = express.Router();

router.get('/map/reverse-geocode', (req, res) => {
    res.send({
        test: 'asd'
    })
});

module.exports = router;

const express = require('express');
const request = require('request');
const router = express.Router();

// TODO: 추후 수정
require('dotenv').config({
    path: '.env.development.local'
});

router.get('/test', (req, res) => {
    res.send({
        test: true
    })
});

router.get('/map/geocode', (req, res) => {
    const query = req.query;

    const params = {
        method: 'get',
        url: 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode',
        headers: {
            'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_NCLOUD_CLIENT_ID,
            'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NCLOUD_CLIENT_SECRET
        },
        qs: {
            query: query.address
        }
    };

    request(params, (error, response, body) => {
        const data = JSON.parse(body);
        let result = {};

        if (data.status === 'OK') {
            result = {
                success: true,
                addresses: data.addresses
            };
        } else {
            result = {
                success: false,
                addresses: []
            };
        }

        res.send(result);
    });
});

module.exports = router;

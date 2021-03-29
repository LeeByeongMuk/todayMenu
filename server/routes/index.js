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
        url: 'https://dapi.kakao.com/v2/local/search/address.json',
        headers: {
            'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`
        },
        qs: {
            query: query.address
        }
    };

    request(params, (error, response, body) => {
        const data = JSON.parse(body);
        let result = {};

        if (data.documents) {
            result = {
                success: true,
                addresses: data.documents
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

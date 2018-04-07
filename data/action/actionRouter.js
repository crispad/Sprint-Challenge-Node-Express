const express = require('express');

const router = express.Router();

const actionDb = require('../helpers/actionModel.js');

router.get('/', (req, res) => {

    actionDb
        .get()
        .then(actions => {
            res.status(201).json(actions);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;
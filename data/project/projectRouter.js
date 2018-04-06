const express = require('express');

const router = express.Router();

const projectDb = require('../helpers/projectModel.js');

router.get('/', (req, res) => {
    
    projectDb
        .get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
           res.status(500).json(error);
        });
});

module.exports = router;
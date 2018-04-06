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

router.get('/:id/', (req, res) => {
    const { id } = req.params;

    projectDb
        .get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error getting that project.' });
        });
});

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;

    projectDb
        .getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error getting that projects action.' });
        });
});

module.exports = router;
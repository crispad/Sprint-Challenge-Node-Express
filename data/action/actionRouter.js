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

router.get('/:id', (req, res) => {
    const { id } = req.params;

    actionDb
        .get(id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error getting that action.' });
        });
});

router.post('/', (req, res) => {
    const action = req.body;

    actionDb
        .insert(action)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error posting action.' });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    actionDb
        .update(id, update)
        .then(count => {
            if (count > 0) {
                actionDb
                    .get(id)
                    .then(project => {
                        res.status(200).json(action);
                    });
            }else {
                res.status(404).json({ message: 'Action with this id does not update.' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    actionDb
        .get(id)
        .then(response => {
            action = {...response[0]};
            actionDb
                .remove(id)
                .then(response => {
                    res.status(200).json(action);
                })
                .catch(error => {
                    res.status(500).json(error);
                });
            })
                .catch(errror => {
                    res.status(500).json(error);
                });
        });


module.exports = router;
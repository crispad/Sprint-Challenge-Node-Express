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

router.post('/', (req, res) => {
    const projects = req.body;
    
    projectDb
        .insert(projects)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error posting.' });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    projectDb
        .update(id, update)
        .then(count => {
            if (count > 0) {
                projectDb
                    .get(id)
                    .then(updatedProjects => {
                        res.status(200).json(updatedProjects);
                    });
            }else {
                res.status(404).json({ message: 'Project with this id does not updated.' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    projectDb
        .get(id)
        .then(response => {
            project = {...response[0]};
            projectDb
                .remove(id)
                .then(response => {
                    res.status(200).json(project);
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        })
                .catch(error => {
                    res.status(500).json(error);
                });
});

module.exports = router;
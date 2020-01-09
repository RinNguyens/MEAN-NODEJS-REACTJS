const router = require('express').Router();
let Exrcise = require('../models/exercise.model');


router.route('/')
    .get((req,res) => {
        Exrcise.find()
            .then(exrcise => {
                res.json(exrcise);
            })
            .catch(err => {
                res.status(400).json("Error" + err);
            })
    })

router.route('/add')
    .post((req,res) => {
        const username = req.body.username;
        const description = req.body.description;
        const duration = Number(req.body.duration);
        const date = Date.now();

        const newExrcise = new Exrcise({
            username,
            description,
            duration,
            date,
        });

        newExrcise.save()
        .then(()=> {
            res.json("Add Exrcise Success");
        })
        .catch(err => {
            res.status(400).json("Error" + err);
        })
    });

router.route('/:id')
    .get((req,res) => {
        let id = req.params.id;
        Exrcise.findById(id)
            .then(exrcise => {
                res.json(exrcise)
            })
            .catch(err => {
                res.status(400).json("Get ID error");
            })
    });

router.route('/delete/:id')
    .delete((req,res) => {
        let id = req.params.id;
        Exrcise.findByIdAndDelete(id)
            .then(exrcise => {
                res.json("Delete Successfly Exrcise");
            })
            .catch(err => {
                res.status(400).json("Delete Failer : Exrcise");
            })
    });


router.route('/update/:id')
    .post((req,res) => {
        let id = req.params.id;
        Exrcise.findById(id)
            .then(exrcise => {
                let username =  req.body.username;
                let description = req.body.description;
                let duration = req.body.duration;
                let date = Date.now();

                exrcise.username = username;
                exrcise.description = description;
                exrcise.duration = duration;
                exrcise.date = date;

                exrcise.save()
                .then(exrciseU => {
                    res.json("Update Exrcise Successfly");
                })
                .catch(err => {
                    res.status(400).json("Delete Failer Exrcise" + err);

                })
            })
            .catch(err => {
                res.status(400).json("Delete Failer Exrcise" + err);
            })
    })

module.exports = router;
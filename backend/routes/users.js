const router = require('express').Router();
let User = require('../models/user.model');

router.route('/')
    .get((req,res) => {
        User.find()
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                res.status(400).json('Error' + err);
            })
    });

router.route('/add')
    .post((req,res) => {
        const username = req.body.username;
        const newUser = new User({
            username : username
        });

        newUser.save()
        .then(()=>{
            res.json("User added !");
        })
        .catch(err => {
            res.status(400).json("Error : " + err);
        })
    })

router.route('/:id')
    .get((req,res) => {
        let id = req.params.id;
        User.findById(id)
            .then(exercise => {
                res.json(exercise);
            })
            .catch(err => {
                res.status(400).json("Error" + err);
            })
    }) 

router.route('/:id')
    .delete((req,res) => {
        let id = req.params.id;
        User.findByIdAndDelete(id)
            .then(() => {
                res.json('Delete Users id : ' + id);
            })
            .catch(err => {
                res.status(400).json("Error :" + err);
            })
    })

router.route('/update/:id')
    .post((req,res) => {
        let id = req.params.id;
        User.findById(id)
            .then(user => {
                user.username = req.body.username;

                user.save()
                .then(user => {
                    res.json("Update User success");
                })
                .catch(err => {
                    res.status(400).json("Error : " + err)
                })
            })
            .catch(err => {
                res.status(400).json("Error: "+ err);
            })
    })
module.exports = router;
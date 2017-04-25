var express = require("express");
var async = require("async");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {
    db.disease.findAll().then(function(diseases) {
        res.render("diseases/all", { diseases: diseases });
    });
});

router.get("/add", function(req, res) {
    res.render("diseases/add");
});

router.post("/", function(req, res) {
    console.log("req.body");
    db.disease.create({
        name: req.body.name,
        description: req.body.description,
        severity: req.body.severity,
        transmission: req.body.transmission
    }).then(function(newDisease) {
        var symptoms = [];
        if (req.body.symptoms) {
            symptoms = req.body.symptoms.split(",");
        }
        if (symptoms.length > 0) {
            async.forEachSeries(symptoms, function(s, callback) {
                //function that runs for each symptom
                db.symptom.findOrCreate({
                    where: { name: s.trim() }
                }).spread(function(symptom, wasCreated) {
                    newDisease.addSymptom(symptom);
                    //this puts the new diseaseid and symptomid in the joint table
                    callback(); //this ends the loop.
                });
            }, function() {
                //Runs when everything is done.
                res.redirect("/diseases");
            });

        } else {
            res.redirect("/diseases");
        }
    }).catch(function(error) {
        res.send(error);
    });
});
//this will do a big old join to search..
router.get("/:id", function(req, res) {
    db.disease.findOne({
        where: { id: req.params.id },
        include: [db.symptom]
    }).then(function(disease) {
        res.render("diseases/show", { disease: disease });
    });
});

module.exports = router;

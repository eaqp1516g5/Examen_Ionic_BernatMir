var fs = require('fs');
module.exports = function (app) {
    var subject = require('../models/Subject.js');
    var student = require('../models/Student.js');

    addSubject = function (req, res, next) {
        console.log(req.body.name);
        if (!req.body.name) {
            res.status(400).send('Wrong data');
        }
        else {
            var newSuject = new subject({
                name: req.body.name
            });
            newSuject.save();
            res.json(newSuject);
        }
    };
    addStudent = function (req, res, next) {
        console.log('Añado student'+req.body);
        if (!req.body.name) {
            res.status(400).send('Wrong data');
        }
        else {
            var newstudent = new student({
                name: req.body.name,
                address: req.body.address,
                phones:[]
            });
           newstudent.phones.push({name: req.body.place, tlf: req.body.tlf});
            newstudent.save();
            console.log(req.params.name);
            subject.findOne({name: req.params.name},function(err, assig) {
                console.log('asignatura'+assig);
                if (assig == undefined)
                    res.status(404).send("No se existe la assignatura");
                else {
                    console.log('aádo'+newstudent._id);
                    assig.students.push(newstudent._id);
                    assig.save();
                    newstudent.save();
                    res.json(assig);
                }})
        }
    };

    getSubject = function (req, res) {
        var resultado = res;
        if (req.params.subject_id != undefined) {
            subject.findOne({_id: req.params.subject_id}).populate('students').exec(function(err,story){
                if(err) res.send(err);
                else res.json(story);
            })
        }
        else {
            subject.find({}, {name: 1}, function (err, subj) {
                if (subj.length == 0) {
                    resultado.status(404).send('No hay assignaturas');
                }
                else if (err) res.send(err);
                else res.json(subj);
            });
        }
    };
    getStudent= function (req, res) {
        student.findOne({name:req.params.name}).exec(function (err,data) {
            res.json(data);
        });
    };
    app.post('/subject/:name', addStudent);
    app.get('/subject\?/(:subject_id)?', getSubject);
    app.post('/subject', addSubject);
    app.get('/student/:name',getStudent)
};